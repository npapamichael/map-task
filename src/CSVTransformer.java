import java.io.*;

public class CSVTransformer {
    public static void main(String[] args){
        String inputFile= "public/data/FT_exercise.csv";
        String outputFile= "public/data/sales_long.csv";

        String[] continents = {"America", "Europe", "Asia", "Australia"};

        try(
                BufferedReader reader = new BufferedReader(new FileReader(inputFile));
                BufferedWriter writer = new BufferedWriter(new FileWriter(outputFile))
        ){
            String header = reader.readLine();

            writer.write("sku,name,quarter,year,continent,sales\n");

            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",");

                if(parts.length != 8) continue;

                String sku = parts[0];
                String name = parts[1];
                String quarter = parts[2];
                String year = parts[3];

                for (int i = 0; i < continents.length; i++) {
                    String continent = continents[i];
                    String units = parts[4 + i];

                    String row = String.join(",", sku, name, quarter, year, continent, units);
                    writer.write(row + "\n");
                }
            }
            System.out.println("CSV file transformed successfully.");
        } catch (IOException e) {
            System.out.println("An error occurred while processing the CSV file: " + e.getMessage());
        }
    }
}