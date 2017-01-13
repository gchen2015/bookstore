(function() {
    'use strict';

    angular
        .module('bookstoreApp')
        .controller('BookDialogController', BookDialogController);

    BookDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Book','Upload', 'Ahdin'];

    function BookDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Book,Upload, Ahdin) {
        var vm = this;
        $scope.book = entity;
        vm.book = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.book.id !== null) {
                Book.update(vm.book, onSaveSuccess, onSaveError);
            } else {
                Book.save(vm.book, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('bookstoreApp:bookUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.publicationDate = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }


        $scope.onFileSelect = function(uploadFile, name){

                	var bookid = 0;
                	if ($scope.book.id != null){
                		bookid = $scope.book.id;
                	}
                	var uploadImageFile = function(compressedBlob) {
                		Upload.upload({

                            url: '/api/postImage',
                            fields: { bookid: bookid },
                            file: compressedBlob,
                            method: 'POST'

                        }).progress(function (evt) {

                            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                            console.log('progress: ' + progressPercentage + '% ');

                        }).success(function (data, status, headers, config) {

                       	 if (name == "image"){
                       		$scope.book.photo = data.image;
                       	 }

                        }).error(function (data, status, headers, config) {

                            console.log('error status: ' + status);
                        });
                	};

                	//TODO gif no compress
               	 	Ahdin.compress({
        	              sourceFile: uploadFile[0],
        	              maxWidth: 1280,
        	              maxHeight:1000,
        	              quality: 0.8
        	          }).then(function(compressedBlob) {
        	        	  console.log('compressed image by ahdin.');
        	              uploadImageFile(compressedBlob);
        	          });
                };

    }
})();
