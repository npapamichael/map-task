import java.sql.*;
import java.io.FileWriter;
import java.io.IOException;
import org.json.JSONArray;
import org.json.JSONObject;

public class json {
    public static void main(String[] args) {
        String jdbcURL = "jdbc:mysql://localhost:3306/map_task";
        String username = "root";
        String password = "map1234";

        String query = """
            SELECT 
                s.units_sold, 
                p.sku, p.name AS product_name,
                t.quarter, t.year,
                c.name AS continent
            FROM sales s
            JOIN products p ON s.product_sku = p.sku
            JOIN time_periods t ON s.time_id = t.id
            JOIN continents c ON s.continent_id = c.id
        """;

        JSONArray jsonArray = new JSONArray();

        try (Connection conn = DriverManager.getConnection(jdbcURL, username, password);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {

            while (rs.next()) {
                JSONObject record = new JSONObject();
                record.put("sku", rs.getInt("sku"));
                record.put("product_name", rs.getString("product_name"));
                record.put("quarter", rs.getInt("quarter"));
                record.put("year", rs.getInt("year"));
                record.put("continent", rs.getString("continent"));
                record.put("units_sold", rs.getInt("units_sold"));
                jsonArray.put(record);
            }

            // Save to file
            try (FileWriter file = new FileWriter("sales_data.json")) {
                file.write(jsonArray.toString(4)); 
                System.out.println("Data successfully written to sales_data.json");
            } catch (IOException e) {
                System.out.println("Error writing to file: " + e.getMessage());
            }

        } catch (SQLException e) {
            System.out.println("Database error: " + e.getMessage());
        }
    }
}
