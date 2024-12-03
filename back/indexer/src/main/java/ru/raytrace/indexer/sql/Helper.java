package ru.raytrace.indexer.sql;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Helper {

    private static Connection con;

    private static final String DB_URL = "jdbc:postgresql://212.20.53.169:5656/cookiefest";
    private static final String USER = "postgres";
    private static final String PASS = "123123";

    public static Connection getConnection() throws SQLException {
        if (con == null || con.isClosed() || !con.isValid(100)) {
            con = DriverManager
                    .getConnection(DB_URL, USER, PASS);
        }

        return con;
    }
}
