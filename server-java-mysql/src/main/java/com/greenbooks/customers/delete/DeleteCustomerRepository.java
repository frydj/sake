package com.greenbooks.customers.delete;

import org.springframework.data.jpa.repository.JpaRepository;

public abstract interface DeleteCustomerRepository extends JpaRepository<DeleteCustomer, Long> {

}