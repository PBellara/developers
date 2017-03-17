app.directive('focus', function() {
    return function(scope, element) {
        element[0].focus();
    }      
});

app.directive('passwordMatch', [function () {
    return {
        restrict: 'A',
        scope:true,
        require: 'ngModel',
        link: function (scope, elem , attrs,control) {
            var checker = function () {
 
                //get the value of the first password
                var e1 = scope.$eval(attrs.ngModel); 
 
                //get the value of the other password  
                var e2 = scope.$eval(attrs.passwordMatch);
                if(e2!=null)
                return e1 == e2;
            };
            scope.$watch(checker, function (n) {
 
                //set the form control to valid if both 
                //passwords are the same, else invalid
                control.$setValidity("passwordNoMatch", n);
            });
        }
    };
}]);

app.directive('validateEmail', function() {
  var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

  return {
    require: 'ngModel',
    restrict: '',
    link: function(scope, elm, attrs, ctrl) {
      // only apply the validator if ngModel is present and Angular has added the email validator
      if (ctrl && ctrl.$validators.email) {

        // this will overwrite the default Angular email validator
        ctrl.$validators.email = function(modelValue) {
          return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
        };
      }
    }
  };
});

app.directive('onlyDigits', function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attr, ctrl) {
        function inputValue(val) {
          if (val) {
            var digits = val.replace(/[^0-9]/g, '');

            if (digits !== val) {
              ctrl.$setViewValue(digits);
              ctrl.$render();
            }
            return parseInt(digits,10);
          }
          return undefined;
        }            
        ctrl.$parsers.push(inputValue);
      }
    };
});

app.directive('digitWithDecimal', function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attr, ctrl) {
        function inputValue(val) {
          if (val) {
            var digits = val.replace(/[^0-9.]/g, '');

            if (digits !== val) {
              ctrl.$setViewValue(digits);
              ctrl.$render();
            }
            return parseFloat(digits);
          }
          return undefined;
        }            
        ctrl.$parsers.push(inputValue);
      }
    };
 });

app.directive('uppercased', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function(input) {
                return input ? input.toUpperCase() : "";
            });
            element.css("text-transform","uppercase");
        }
    };
})

app.directive('nksOnlyNumber', function () {
	return {
		restrict: 'EA',
		require: 'ngModel',
		link: function (scope, element, attrs, ngModel) {   
			 scope.$watch(attrs.ngModel, function(newValue, oldValue) {
				  var spiltArray = String(newValue).split("");

				  if(attrs.allowNegative == "false") {
					if(spiltArray[0] == '-') {
					  newValue = newValue.replace("-", "");
					  ngModel.$setViewValue(newValue);
					  ngModel.$render();
					}
				  }

				  if(attrs.allowDecimal == "false") {
					  newValue = parseInt(newValue);
					  ngModel.$setViewValue(newValue);
					  ngModel.$render();
				  }

				  if(attrs.allowDecimal != "false") {
					if(attrs.decimalUpto) {
					   var n = String(newValue).split(".");
					   if(n[1]) {
						  var n2 = n[1].slice(0, attrs.decimalUpto);
						  newValue = [n[0], n2].join(".");
						  ngModel.$setViewValue(newValue);
						  ngModel.$render();
					   }
					}
				  }


				  if (spiltArray.length === 0) return;
				  if (spiltArray.length === 1 && (spiltArray[0] == '-' || spiltArray[0] === '.' )) return;
				  if (spiltArray.length === 2 && newValue === '-.') return;

				/*Check it is number or not.*/
				if (isNaN(newValue)) {
				  ngModel.$setViewValue(oldValue);
				  ngModel.$render();
				}
			});
		}
	};
});

app.directive("floatingValidation", ['$animate', function($animate){
	var messages = {
		required: "This field is required",
		minlength: "Min length should be @value@ characters",
		maxlength: "Max length @value@ characters reached",
		pattern: "don\'t match the pattern",
		"email": "Mail address not valid",
		"number": "insert only numbers",
		"custom": "custom not valid type \"@value@\"",
		"async": "async not valid type \"@value@\""
	};

	return {
		scope: true,
		require: ['^form', 'ngModel'],
		restrict: "A",
		link: function(scope, element, attrs, controller){
			scope.formCtrl = controller[0];
			scope.inputCtrl = controller[1];

			var $float = jQuery('<label for="'+attrs.id+'" class="float">'+attrs.placeholder+'</span>');

			scope.showHide = function(show){
				if(show){
					if(!$float.hasClass('top')){
						element.after($float);
						$animate.addClass($float, 'top');
					}
				}else {
					$animate.removeClass($float, 'top');
				}
			};

			scope.showErrors = function(){
				angular.forEach(scope.inputCtrl.$error, function (e, i) {
					if (e) {
						if( i == "minlength"){
							$float.text(messages[i].replace("@value@", attrs["ngMinlength"]));
						}else if(i == "maxlength"){
							$float.text(messages[i].replace("@value@", attrs["ngMaxlength"]));
						}else{
							$float.text(messages[i].replace("@value@", attrs[i]));
						}
					}
				});
				scope.showHide(true);
			};

			scope.$watch('inputCtrl.$error', function (newValue) {
				if(JSON.stringify(newValue) !=='{}' && !scope.inputCtrl.$pristine){
					scope.showErrors();
				}
			},true);

			scope.$watch('inputCtrl.$valid', function (newValue) {
				if(newValue && !scope.inputCtrl.$pristine){
					$float.text(attrs.placeholder);
					scope.showHide(true);
				}
			});

			scope.$watch('inputCtrl.$pristine', function (newValue) {
				if(newValue && scope.inputCtrl.$touched){
					scope.showHide(false);
					scope.inputCtrl.$setUntouched();
					//immediately reset no debounce
					scope.inputCtrl.$setViewValue(undefined, scope.inputCtrl.$options.updateOn);
					scope.inputCtrl.$setPristine();
				}
			});

			scope.$watch('formCtrl.$submitted', function (newValue) {
				if(newValue && scope.inputCtrl.$invalid){
					scope.showErrors();
				}else if(!scope.inputCtrl.$dirty){
					//reset if filled void
					scope.showHide(false);
				}
			});
		}
	};
}]);

app.directive("floatingLabel", ['$animate', function($animate){
	return {
		scope: true,
		require: 'ngModel',
		restrict: "A",
		link: function(scope, element, attrs, controller){
			scope.inputCtrl = controller;

			var $float = jQuery('<label for="'+attrs.id+'" class="float">'+attrs.placeholder+'</span>');

			scope.showHide = function(show){
				if(show){
					if(!$float.hasClass('top')){
						element.after($float);
						$animate.addClass($float, 'top');
					}
				}else {
					$animate.removeClass($float, 'top');
				}
			};

			scope.$watch('inputCtrl.$modelValue', function (newValue) {
				if(newValue !== undefined){
					scope.showHide(newValue.length);

					if(!newValue.length){
						scope.inputCtrl.$setPristine();
					}
				}
			});

			scope.$watch('inputCtrl.$pristine', function (newValue) {
				if(newValue && scope.inputCtrl.$touched){
					scope.showHide(false);
					scope.inputCtrl.$setUntouched();
					//immediately reset no debounce
					scope.inputCtrl.$setViewValue(undefined, scope.inputCtrl.$options.updateOn);
					scope.inputCtrl.$setPristine();
				}
			});
		}
	};
}]);

app.directive('customValidator', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$validators.custom = function (value) {
                return value === "foo";
            };
        }
    };
});

app.directive('asyncValidator', ['$fakeValidationService', '$q', function ($fakeValidationService, $q) {
    return {
        require: 'ngModel',
        link: function ($scope, element, attrs, ngModel) {
            ngModel.$asyncValidators.async = function (modelValue, viewValue) {
                var value = modelValue || viewValue;
                if(value.length){
                    element.before('<i class="icon-spin icon-refresh"></i>').parent().addClass('spinner');

                    return $fakeValidationService.get(value).then(function(response) {
                        element.parent().removeClass('spinner').find('i').remove();
                        return true;
                    }, function(response) {
                        element.parent().removeClass('spinner').find('i').remove();
                        if (!response.valid) {
                            return $q.reject();
                        }
                    });
                }
            };
        }
    }
}])

app.directive('date', function (dateFilter) {
    return {
        require:'ngModel',
        link:function (scope, elm, attrs, ctrl) {

            var dateFormat = attrs['date'] || 'dd-MM-yyyy';
           
            ctrl.$formatters.unshift(function (modelValue) {
				return dateFilter(modelValue, dateFormat);
            });
        }
    };
})

app.$inject = ['$scope', '$filter'];
app.directive("customSort", function() {
return {
    restrict: 'A',
    transclude: true,    
    scope: {
      order: '=',
      sort: '='
    },
    template : 
      ' <a ng-click="sort_by(order)" style="color: #555555;">'+
      '    <span ng-transclude></span>'+
      '    <i ng-class="selectedCls(order)"></i>'+
      '</a>',
    link: function(scope) {
                
    // change sorting order
    scope.sort_by = function(newSortingOrder) {       
        var sort = scope.sort;
        
        if (sort.sortingOrder == newSortingOrder){
            sort.reverse = !sort.reverse;
        }                    

        sort.sortingOrder = newSortingOrder;        
    };
    
   
    scope.selectedCls = function(column) {
        if(column == scope.sort.sortingOrder){
            return ('icon-chevron-' + ((scope.sort.reverse) ? 'down' : 'up'));
        }
        else{            
            return'icon-sort' 
        } 
    };      
  }// end link
}
});
