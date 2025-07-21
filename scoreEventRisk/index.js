exports.handler = async (event) => {
  console.log("📊 Scoring event risk...");

  // Simuler un score basé sur l’eventName
  let riskScore = 0;

  if (event.eventName === "StopLogging") {
    riskScore = 95; // Très risqué
  } else {
    riskScore = 40; // Risque modéré
  }

  const scoredEvent = {
    ...event,
    riskScore,
  };

  return scoredEvent;
};
