package com.sake.plans;

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
@RequestMapping("/plan")
public class PlanController {

  @Autowired
  PlanRepository planRepository;

  @GetMapping()
  public List<Plan> getPlans() {
    return planRepository.findAll();
  }
  
  @GetMapping("/{planId}")
  public Optional<Plan> getPlan(@PathVariable Long planId) {
 return planRepository.findById(planId);
 }
 
@PostMapping()
 public Plan addPlan(@RequestBody Plan plan) {
 return planRepository.save(plan);
 }

@CrossOrigin
@DeleteMapping("/{planId}")
 public void deletePlan(@PathVariable Long planId) {
 planRepository.deleteById(planId);
 }

@CrossOrigin
@PutMapping("/{planId}")
 public Plan updateProject(@PathVariable Long planId, @RequestBody Plan plan) {
 Plan foundPlan = planRepository.findById(planId).orElse(null);
 if (foundPlan != null) {
 
foundPlan.setPlanName(plan.getPlanName());
        foundPlan.setRateOne(plan.getRateOne());
        foundPlan.setRateTwo(plan.getRateTwo());
        foundPlan.setRateThree(plan.getRateThree());
        foundPlan.setRateFour(plan.getRateFour());
        foundPlan.setRateFive(plan.getRateFive());
        foundPlan.setPlanOffered(plan.getPlanOffered());
        foundPlan.setSharedData(plan.getSharedData());
        foundPlan.setUnlimited(plan.getUnlimited());
        foundPlan.setDeviceType(plan.getDeviceType());
 
 planRepository.save(foundPlan);
 return foundPlan;
 }
 return null;
 }
}