package com.sake.settings.user;

// import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user_settings")
public class UserSetting {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
        private Long userId;
        private String darkMode;
        private String nextSetting;
        private String theme;

        public String getTheme() {
			return theme;
		}
		public void setTheme(String theme) {
			this.theme = theme;
		}
		public  Long  getUserId() {
                return userId;
        }
        public void setUserId(Long userId) {
                this.userId = userId;
        }
        public  String  getDarkMode() {
                return darkMode;
        }
        public void setDarkMode(String darkMode) {
                this.darkMode = darkMode;
        }
        public  String  getNextSetting() {
                return nextSetting;
        }
        public void setNextSetting(String nextSetting) {
                this.nextSetting = nextSetting;
        }

}