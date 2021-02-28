package com.greenbooks.customers.search;

import org.springframework.data.jpa.repository.JpaRepository;

public abstract interface CustomerSearchInputRepository extends JpaRepository<CustomerSearchInput, Long> {

}