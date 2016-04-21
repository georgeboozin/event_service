function BurgerController() {

  var ctrl = this;
  ctrl.isOpen = false;
  ctrl.demo = {
    isOpen: false,
    count: 1,
    direction: 'right'
  };
  
  ctrl.clickCreateEvent = function(){
    ctrl.cards.createEvent = true;
    ctrl.cards.topEvents = false;
    ctrl.cards.profile = false;
  };

  ctrl.clickShowProfile = function(){
    ctrl.cards.createEvent = false;
    ctrl.cards.topEvents = false;
    ctrl.cards.profile = true;
  };

  ctrl.clickShowTopEvents = function(){
    ctrl.cards.createEvent = false;
    ctrl.cards.topEvents = true;
    ctrl.cards.profile = false;
  };
}

EventService.component('burgerMenu', {
  templateUrl: 'templates/burger-menu.html',
  bindings:{
    cards:'='
  },
  controller: BurgerController
});