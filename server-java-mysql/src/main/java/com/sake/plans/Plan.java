package com.sake.plans;

// import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "plans")
public class Plan {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
        private Long planId;
        private String planName;
        private Long rateOne;
        private Long rateTwo;
        private Long rateThree;
        private Long rateFour;
        private Long rateFive;
        private String planOffered;
        private String sharedData;
        private String unlimited;
        private String deviceType;

        public  Long  getPlanId() {
                return planId;
        }
        public void setPlanId(Long planId) {
                this.planId = planId;
        }
        public  String  getPlanName() {
                return planName;
        }
        public void setPlanName(String planName) {
                this.planName = planName;
        }
        public  Long  getRateOne() {
                return rateOne;
        }
        public void setRateOne(Long rateOne) {
                this.rateOne = rateOne;
        }
        public  Long  getRateTwo() {
                return rateTwo;
        }
        public void setRateTwo(Long rateTwo) {
                this.rateTwo = rateTwo;
        }
        public  Long  getRateThree() {
                return rateThree;
        }
        public void setRateThree(Long rateThree) {
                this.rateThree = rateThree;
        }
        public  Long  getRateFour() {
                return rateFour;
        }
        public void setRateFour(Long rateFour) {
                this.rateFour = rateFour;
        }
        public  Long  getRateFive() {
                return rateFive;
        }
        public void setRateFive(Long rateFive) {
                this.rateFive = rateFive;
        }
        public  String  getPlanOffered() {
                return planOffered;
        }
        public void setPlanOffered(String planOffered) {
                this.planOffered = planOffered;
        }
        public  String  getSharedData() {
                return sharedData;
        }
        public void setSharedData(String sharedData) {
                this.sharedData = sharedData;
        }
        public  String  getUnlimited() {
                return unlimited;
        }
        public void setUnlimited(String unlimited) {
                this.unlimited = unlimited;
        }
        public  String  getDeviceType() {
                return deviceType;
        }
        public void setDeviceType(String deviceType) {
                this.deviceType = deviceType;
        }

}