const AWS = require("aws-sdk");
const athena = new AWS.Athena();

exports.handler = async (event) => {
  const params = {
    QueryString: `
      SELECT *
      FROM cloudtrail_logs
      WHERE
        (eventName IN ('StopLogging', 'DeleteTrail'))
        OR (userIdentity.type = 'Root')
        OR (errorCode = 'AccessDenied')
    `,
    ResultConfiguration: {
      OutputLocation: 's3://cloudwatch-guardian-logs/athena-results/',
    },
    QueryExecutionContext: {
      Database: 'cloudtrail_guardian_db'
    }
  };

  try {
    const queryExecution = await athena.startQueryExecution(params).promise();
    const queryExecutionId = queryExecution.QueryExecutionId;

    // Attendre l'exécution
    let state = 'RUNNING';
    while (state === 'RUNNING' || state === 'QUEUED') {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const status = await athena.getQueryExecution({ QueryExecutionId: queryExecutionId }).promise();
      state = status.QueryExecution.Status.State;

      if (state === 'FAILED') {
        throw new Error("Athena query failed");
      }
    }

    // Lire les résultats
    const results = await athena.getQueryResults({ QueryExecutionId: queryExecutionId }).promise();
    const rows = results.ResultSet.Rows;

    // Ignorer l'en-tête et extraire les événements
    const events = rows.slice(1).map(row => {
      return row.Data.map(cell => cell.VarCharValue);
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ suspiciousEvents: events }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur lors de l'exécution Athena" }),
    };
  }
};
