package com.angellos.payment.repository;

import com.angellos.payment.entity.Payment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, UUID> {


    @Query("""
        select p
        from  Payment  p
        where (lower(p.recipientName)  like lower(concat('%', :search, '%')) )
        or (lower(p.amount)  like lower(concat('%', :search, '%')) )
        or (lower(cast(p.paymentStatus as string ))  like lower(concat('%', :search, '%')) )
        or (lower(cast(p.transactionType as string ))  like lower(concat('%', :search, '%')) )
    """)
    List<Payment> findPaymentByNameContaining(@Param("search") String searchValue);

    @Query("""
        select p
        from  Payment  p
        where (lower(p.recipientName)  like lower(concat('%', :search, '%')) )
        or (lower(p.amount)  like lower(concat('%', :search, '%')) )
        or (lower(cast(p.paymentStatus as string ))  like lower(concat('%', :search, '%')) )
        or (lower(cast(p.transactionType as string ))  like lower(concat('%', :search, '%')) )
    """)
    Page<Payment> findPagedPaymentByNameContaining(@Param("search") String searchValue, Pageable pageable);

    @Query("""
        select p
        from  Payment  p
        where p.sequenceId = :sequenceId
        """)
    Payment findBySequenceId(@Param("sequenceId")String sequenceId);
}
