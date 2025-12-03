package com.raichess; // Или ваш пакет

import jakarta.annotation.PreDestroy;
import jakarta.annotation.Resource;
import jakarta.ejb.Singleton;
import jakarta.ejb.Startup;

import javax.sql.DataSource;

import java.io.File;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

@Singleton
@Startup
public class DatabaseDumpService {


    @Resource(lookup = "java:jboss/datasources/Lab3DS")
    private DataSource dataSource;


    private static final String WILDLY_DATA_DIR = System.getProperty("jboss.server.data.dir");


    @PreDestroy
    public void dumpDatabaseOnShutdown() {
        if (dataSource == null) {
            System.err.println("DataSource не инжектирован. Дамп невозможен.");
            return;
        }


        String dumpFileName = WILDLY_DATA_DIR + File.separator + "exported_points.sql";

        String sqlCommand = "SCRIPT TO '" + dumpFileName + "'";


        try (Connection connection = dataSource.getConnection();
             Statement statement = connection.createStatement()) {

            statement.execute(sqlCommand);


        } catch (SQLException e) {

        }
    }
}