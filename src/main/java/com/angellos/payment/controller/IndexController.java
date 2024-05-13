package com.angellos.payment.controller;

import com.angellos.payment.dto.PaymentRequestDTO;
import com.angellos.payment.entity.Payment;
import com.angellos.payment.service.PaymentService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
@Slf4j
@AllArgsConstructor
public class IndexController {

    private final PaymentService paymentService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView index() {
        log.info("inside YellowCard - index");
        ModelAndView model = new ModelAndView("index");
        return model;
    }


    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String indexView() {
        log.info("inside YellowCard - index");
        return "index";
    }


    @PostMapping("/withdraw")
    @ResponseBody()
    public ResponseEntity withdraw(@RequestBody(required = false) PaymentRequestDTO payload){
        log.info("inside YellowCard - withdraw");
        log.info("Payload : {}", payload);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    @GetMapping(value = "/payments")
    @ResponseBody
    public ModelAndView getPayments(@RequestParam(value = "searchKey", defaultValue = "") String searchKey,
                                    @RequestParam(defaultValue = "0", value = "currentPage") int page,
                                    @RequestParam(defaultValue = "10") int size) {
        return getPaymentsWithPaging(searchKey, page, size);
    }


    @RequestMapping(value = "paging", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView getPaymentsWithPaging(@RequestParam(value = "searchKey", defaultValue = "") String searchKey,
                                              @RequestParam(defaultValue = "0", value = "currentPage") int page,
                                              @RequestParam(defaultValue = "10") int size) {
        if (size <= 0) {
            size = 10;
        }
        if (page <= 0) {
            page = 0;
        }

        try {

            List<Payment> payments;
            Pageable paging = PageRequest.of(page, size);
            Page<Payment> pageSubs;

            pageSubs = paymentService.filterTransactionsForUI(paging, searchKey);
            System.out.println(pageSubs.getContent());
            payments = pageSubs.getContent();
            ModelAndView model = new ModelAndView("payments");
            model.addObject("currentPage", pageSubs.getNumber());
            model.addObject("totalPages", pageSubs.getTotalPages());
            model.addObject("totalItems", pageSubs.getTotalElements());
            model.addObject("size", size);
            model.addObject("searchKey", searchKey);
            model.addObject("payments", payments);
            return model;

        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }
}
