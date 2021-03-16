package com.sake.settings.user;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usersetting")
public class UserSettingController {

  @Autowired
  UserSettingRepository userSettingRepository;

  @GetMapping()
  public List<UserSetting> getUserSettings() {
    return userSettingRepository.findAll();
  }
  
  @GetMapping("/{userId}")
  public Optional<UserSetting> getUserSetting(@PathVariable Long userId) {
 return userSettingRepository.findById(userId);
 }
 
@PostMapping()
 public UserSetting addUserSetting(@RequestBody UserSetting usersetting) {
 return userSettingRepository.save(usersetting);
 }

@CrossOrigin
@DeleteMapping("/{userId}")
 public void deleteUserSetting(@PathVariable Long userId) {
 userSettingRepository.deleteById(userId);
 }

@CrossOrigin
@PutMapping("/{userId}")
 public UserSetting updateProject(@PathVariable Long userId, @RequestBody UserSetting usersetting) {
 UserSetting foundUserSetting = userSettingRepository.findById(userId).orElse(null);
 if (foundUserSetting != null) {
 
	foundUserSetting.setDarkMode(usersetting.getDarkMode());
	foundUserSetting.setNextSetting(usersetting.getNextSetting());
	foundUserSetting.setTheme(usersetting.getTheme());
 
 userSettingRepository.save(foundUserSetting);
 	return foundUserSetting;
 }
 return null;
 }
}