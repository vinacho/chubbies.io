package com.company;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;
import java.io.FileWriter;

public class Main {
    private static int[][] convertTo2DUsingGetRGB(BufferedImage image) {
        int width = image.getWidth();
        int height = image.getHeight();
        int[][] result = new int[height][width];

        for (int row = 0; row < height; row++) {
            for (int col = 0; col < width; col++) {
                result[row][col] = image.getRGB(col, row);
            }
        }

        return result;
    }
    private static BufferedImage readPNG(String fileName) {
        BufferedImage imageFile = null;
        try {
            imageFile = ImageIO.read(new File(fileName));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return imageFile;
    }

    public static void main(String[] args) {
        BufferedImage imageFile = null;
        Integer firstFileNumber = 1;
        Integer lastFileNumber = 110;


        try {
            FileWriter myWriter = new FileWriter("pixelart.scss");
            myWriter.write("$bwpunks:(\n");
            for(int file = firstFileNumber; file <= lastFileNumber; file++) {
                imageFile = readPNG(String.valueOf(file) + ".png");
                int[][] result = convertTo2DUsingGetRGB(imageFile);
                myWriter.write("  (\n");
                for(int i = 0; i < result.length; i++) {
                    myWriter.write("    (");
                    for(int j = 0; j < result[i].length; j++) {
                        if(j == result[i].length-1) {
                            if (result[i][j] == -1) {
                                myWriter.write("░");
                            } else {
                                myWriter.write("█");
                            }
                        } else {
                            if (result[i][j] == -1) {
                                myWriter.write("░ ");
                            } else {
                                myWriter.write("█ ");
                            }
                        }
                    }
                    myWriter.write("),\n");
                }
                myWriter.write("  ),\n");
            }
            myWriter.write(");\n");
            myWriter.close();
            System.out.println("Successfully wrote to the file.");
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }
}
