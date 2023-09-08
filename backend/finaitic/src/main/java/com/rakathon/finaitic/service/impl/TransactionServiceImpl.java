package com.rakathon.finaitic.service.impl;

import com.opencsv.bean.CsvToBeanBuilder;
import com.rakathon.finaitic.dao.CsvMapper;
import com.rakathon.finaitic.entity.Category;
import com.rakathon.finaitic.entity.Transaction;
import com.rakathon.finaitic.repo.CategoryRepository;
import com.rakathon.finaitic.repo.TransactionRepository;
import com.rakathon.finaitic.service.TransactionService;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.nio.file.Path;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TransactionServiceImpl implements TransactionService {
    Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    TransactionRepository transactionRepository;
    @Autowired
    CategoryRepository categoryRepository;
    private List<Category> categories;
    Map<String, Integer> keywords;

    @Override
    public boolean saveTransactions(String user, Path destinationFile) {
        try {
            List<CsvMapper> list = new CsvToBeanBuilder(new FileReader(destinationFile.toFile()))
                    .withType(CsvMapper.class)
                    .build()
                    .parse();
            saveTransactionsListWithDetails(list, user);
            return true;
        }
        catch (FileNotFoundException e) {
            log.error("file not found while parsing");
        }
        return false;
    }

    private boolean saveTransactionsListWithDetails(List<CsvMapper> list, String user) {
        this.categories = categoryRepository.findAll();
        this.keywords = new HashMap<>();
        categories.forEach( category -> {
            int id = category.getId();
            category.getKeywords().forEach(str-> keywords.put(str, id));
        });
        list.stream().forEach(txn -> populateTxnEntity(txn, user));
        return true;
    }

    private void populateTxnEntity(CsvMapper txn, String user){
        Transaction txn1 = new Transaction();
        txn1.setId(UUID.randomUUID());
        txn1.setDetails(txn.getDetails());
        txn1.setDeposit(StringUtils.isNotEmpty(txn.getDeposit())?Double.parseDouble(txn.getDeposit()): null);
        txn1.setWithdrawal(StringUtils.isNotEmpty(txn.getWithdrawal())?Double.parseDouble(txn.getWithdrawal()): null);
        txn1.setBalance(StringUtils.isNotEmpty(txn.getBalance())?Double.parseDouble(txn.getBalance()): null);
        txn1.setStrdate(txn.getStrdate());
        txn1.setUserId(UUID.fromString(user));
        txn1.setTxdate(StringUtils.isNotEmpty(txn.getStrdate())? getDateFromStrDate(txn.getStrdate()): null);
        txn1.setCategory(StringUtils.isNotEmpty(txn.getDetails())? mapDetailToCategory(txn.getDetails(), keywords, categories): "OTHER");
        transactionRepository.save(txn1);
    }

    private Date getDateFromStrDate(String strdate) {
        SimpleDateFormat format = new SimpleDateFormat("dd/mm/yyyy");
        try {
            return format.parse(strdate);
        } catch (ParseException e) {
            log.error("error while parsing dates");
            return null;
        }
    }

    private String mapDetailToCategory(String details, Map<String, Integer> keywords, List<Category> categories) {
        if(keywords.size() > 0){
            Set<String> hints = Arrays.stream(details.split(" ")).collect(Collectors.toSet());
            if(CollectionUtils.isEmpty(hints) || hints.size() == 1)
                hints.addAll(Arrays.stream(details.split("-")).collect(Collectors.toSet()));
            List<Integer> categoryIds = hints.stream()
                    .filter(hint -> keywords.containsKey(hint))
                    .map(hint -> keywords.get(hint)).collect(Collectors.toList());
            if(CollectionUtils.isNotEmpty(categoryIds)) {
                List<String> res = categories.stream().filter(cat -> cat.getId() == categoryIds.get(0)).map(cat -> cat.getCategory()).collect(Collectors.toList());
                return res.get(0);
            }else return "OTHER";
        }
        return "OTHER";
    }
}
