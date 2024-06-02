package com.angellos.payment.repository;

import com.angellos.payment.entity.PSender;
import com.angellos.payment.entity.Payment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Repository
public interface SenderRepository extends JpaRepository<PSender, UUID> {


    @Query("""
        select p
        from  PSender  p
        where p.id = :id
        """)
    PSender findBySequenceId(@Param("id")UUID id);
}
