(() => {
  'use strict';
  angular
  .module("tallerRapidito")
  .directive("filesInput", filesInput);

  function filesInput() {

    const filesinput = {
      restrict: 'A',
      require: "ngModel",
      link: function postLink(scope,elem,attrs,ngModel) {
        elem.on("change", function(e) {
          let files = elem[0].files;
          ngModel.$setViewValue(files);
        });
      }
    };

    return filesinput;

  };
})();