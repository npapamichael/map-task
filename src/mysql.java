import java.io.*;
import java.sql.*;

public class mysql {
    public static void main(String[] args) {
        String jdbcURL = "jdbc:mysql://localhost:3306/map_task";
        String username = "root";
        String password = "map1234";
        String csvPath = "public/data/sales_long.csv";

        try (Connection conn = DriverManager.getConnection(jdbcURL, username, password)) {
            conn.setAutoCommit(false);
            BufferedReader reader = new BufferedReader(new FileReader(csvPath));
            reader.readLine(); // skip header

            String line;
            while ((line = reader.readLine()) != null) {
                String[] v = line.split(",");

                int sku = Integer.parseInt(v[0].trim());
                String name = v[1].trim();
                int quarter = Integer.parseInt(v[2].trim());
                int year = Integer.parseInt(v[3].trim());
                String continent = v[4].trim();
                int units = Integer.parseInt(v[5].trim());

                // Insert product (once)
                PreparedStatement p1 = conn.prepareStatement(
                    "INSERT IGNORE INTO products (sku, name) VALUES (?, ?)");
                p1.setInt(1, sku); p1.setString(2, name); p1.executeUpdate(); p1.close();

                // Insert time (once) and get ID
                PreparedStatement t1 = conn.prepareStatement(
                    "INSERT IGNORE INTO time_periods (quarter, year) VALUES (?, ?)");
                t1.setInt(1, quarter); t1.setInt(2, year); t1.executeUpdate(); t1.close();

                PreparedStatement t2 = conn.prepareStatement(
                    "SELECT id FROM time_periods WHERE quarter = ? AND year = ?");
                t2.setInt(1, quarter); t2.setInt(2, year);
                ResultSet r1 = t2.executeQuery(); r1.next(); int timeId = r1.getInt(1);
                t2.close(); r1.close();

                // Insert continent (once) and get ID
                PreparedStatement c1 = conn.prepareStatement(
                    "INSERT IGNORE INTO continents (name) VALUES (?)");
                c1.setString(1, continent); c1.executeUpdate(); c1.close();

                PreparedStatement c2 = conn.prepareStatement(
                    "SELECT id FROM continents WHERE name = ?");
                c2.setString(1, continent);
                ResultSet r2 = c2.executeQuery(); r2.next(); int contId = r2.getInt(1);
                c2.close(); r2.close();

                // Insert sales
                PreparedStatement s1 = conn.prepareStatement(
                    "INSERT INTO sales (product_sku, time_id, continent_id, units_sold) VALUES (?, ?, ?, ?)");
                s1.setInt(1, sku); s1.setInt(2, timeId); s1.setInt(3, contId); s1.setInt(4, units);
                s1.executeUpdate(); s1.close();
            }

            conn.commit();
            reader.close();
            System.out.println("Import complete.");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
