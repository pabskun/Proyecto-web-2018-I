(() => {
  'use strict';
  angular
  .module('tallerRapidito')
  .service('imageUploadService', imageUploadService);

  imageUploadService.$inject = ['$http'];

  function imageUploadService($http){
    const cloudObj = {
      url:'https://api.cloudinary.com/v1_1/thiamine/image/upload',
      data:{
        upload_preset: 'taller_Rapidito',
        tags:'Any',
        context:'photo=test'
      }
    };

    const uploadAPI = {
      getConfiguration : _getConfiguration
    };
    return uploadAPI;

    function _getConfiguration() {
      return cloudObj;
    }
  };
})();