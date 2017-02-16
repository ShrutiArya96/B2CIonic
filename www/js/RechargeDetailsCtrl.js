(function() {
	'use strict';
	var RechargeDetailscontroller = function($scope, $rootScope, Rechargedetails, $http,API) {
		var Get_rechargeData = function(){
         $scope.recharge = Rechargedetails.getRechargeData();
	         $scope.Images = {

	           "AIRCEL:Rr": "img/aircel.jpg",
            "AIRCEL:bill": "img/aircel.jpg",
            "LOOP:Rr": "img/loop.jpg",
            "LOOP:bill": "img/loop.jpg",
            "MTNL:Rr": "img/mtnl.png",
            "MTNL:bill": "img/mtnl.png",
            "MTNL VALIDITY:stv": "img/mtnl.png",
            "MTNL Delhi LandLine" : "img/mtnl.png",
            "MTS:Rr": "img/mts.png",
            "MTS:bill": "img/mts.png",
            "RELIANCE:Rr": "img/reliance.jpg",
            "RELIANCE:bill": "img/reliance.jpg",
            "VIRGIN:Rr": "img/virgin.png",
            "TataIndicom:Rr": "img/tataindicom.png",
            "AIRTEL:Rr": "img/airtel.jpg",
            "AIRTEL LANDLINE:bill": "img/airtel.jpg",
            "RELIANCE GSM:Rr": "img/reliance.png",
            "T24:Rr": "img/T24_Logo-300x209.png",
            "BSNL:Rr": "img/bsnl.png",
            "BSNL VALIDITY:stv": "img/bsnl.png",
            "TATA DOCOMO:Rr": "img/docomo.png",
            "TATA DOCOMO:stv": "img/docomo.png",
            "VODAFONE:Rr": "img/vodafone.jpg",
            "VODAFONE:bill": "img/vodafone.jpg",
            "IDEA:Rr": "img/idea.png",
            "IDEA LANDLINE:bill": "img/idea.png",
            "VIDEOCON:Rr": "img/videocon.jpg",
            "TELENOR:Rr": "img/telenor.jpg",
            "BIGTV:dth": "img/BIG_TV_Logo.jpg",
            "TATASKY:dth": "img/TATASKYDTH.jpg",
            "SUN DIRECT:dth": "img/sun-direct.jpg",
            "DISH TV:dth": "img/dish-tv-online-recharge.jpg",
            "VIDEOCON:dth": "img/Videocon-d2h.jpg",
            "AIRTEL:dth": "img/airtel-dth-recharge.png"

	        };
		};
		Get_rechargeData();
	};

	RechargeDetailscontroller.$inject = [ '$scope', '$rootScope', 'Rechargedetails', '$http' ];
	angular.module('App').controller('RechargeDetailscontroller', RechargeDetailscontroller);
}());
