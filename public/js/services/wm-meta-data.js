wmApp.service('MetaData', function() {

  var defaults = {
    title: 'Warmains | Wotlk Character, Talent & Raid Planner',
    cardTitle: 'Home',
    cardDescription: 'Talent, Character and Raid planner for World of Warcraft: Wrath of the Lich King.',
    cardImageUrl: 'http://media.moddb.com/images/mods/1/28/27592/.5.jpg',
    cardUrl: 'http://warmain.herokuapp.com',
  };

  var title = defaults.title;
  var cardTitle = defaults.cardTitle;
  var cardDescription = defaults.cardDescription;
  var cardImageUrl = defaults.cardImageUrl;
  var cardUrl = defaults.cardUrl;

  // Reset meta data to default values
  function setDefaults() {
    setTitle(defaults.title);
    //setCardTitle(defaults.title);
    //setCardDescription(defaults.cardDescription);
    //setCardImageUrl(defaults.cardImageUrl);
    //setCardUrl(defaults.cardUrl);
  }

  function getTitle() { return title; }
  function setTitle(newTitle) { title = newTitle; }

  function getCardTitle() { return cardTitle; }
  function setCardTitle(newCardTitle) { cardTitle = newCardTitle; }

  function getCardDescription() { return cardDescription; };
  function setCardDescription(newCardDescription) { cardDescription = newCardDescription; };

  function getCardImageUrl() { return cardImageUrl; };
  function setCardImageUrl(newCardImageUrl) { cardImageUrl = newCardImageUrl; }

  function getCardUrl() { return cardUrl; };
  function setCardUrl(newCardUrl) { cardUrl = newCardUrl; };

  return {
    setDefaults: setDefaults,
    getTitle: getTitle,
    setTitle: setTitle,
    getCardTitle: getCardTitle,
    setCardTitle: setCardTitle,
    getCardDescription: getCardDescription,
    setCardDescription: setCardDescription,
    getCardImageUrl: getCardImageUrl,
    setCardImageUrl: setCardImageUrl,
    getCardUrl: getCardUrl,
    setCardUrl: setCardUrl,
  }
});