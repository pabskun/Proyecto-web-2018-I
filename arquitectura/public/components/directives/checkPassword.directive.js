(() => {
  'use strict';
  angular
  .module('tallerRapidito')
  .directive('pwCheck', pwCheck);

  function pwCheck(){
    const passwordCheck = {
      require: 'ngModel',
      link: _confirmation
    }

    return passwordCheck;

    function _confirmation(scope, elem, attrs, ctrl){
      let firstPassword = '#' + attrs.pwCheck;

      elem.add(firstPassword).on('keyup', function () {
        scope.$apply(function () {
          var v = elem.val()===$(firstPassword).val();
          ctrl.$setValidity('pwmatch', v);
        });
      });
    }
  }
})();