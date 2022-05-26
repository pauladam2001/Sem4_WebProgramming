package model;

public class Board {
    public String[][] board;

    public Board() {
        this.board = new String[3][3];
        for (int i = 0; i < 3; ++i) {
            for (int j = 0; j < 3; ++j) {
                this.board[i][j] = "";
            }
        }
    }

    public String getForPosition(int i, int j) {
        return board[i][j];
    }

    public void setForPosition(int i, int j, String value) {
        board[i][j] = value;
    }

    public boolean isFree(int i, int j){
        return board[i][j].equals("");
    }

    public String line() {
        for (int i = 0; i < 3; i++) {
            if (!board[i][0].equals("") && board[i][0].equals(board[i][1]) && board[i][0].equals(board[i][2])) {
                return board[i][0];
            }
        }
        return "";
    }

    public String column() {
        for (int i = 0; i < 3; i++) {
            if (!board[0][i].equals("") && board[0][i].equals(board[1][i]) && board[0][i].equals(board[2][i])) {
                return board[0][i];
            }
        }
        return "";
    }

    public String mainDiagonal() {
        if (!board[0][0].equals("") && board[0][0].equals(board[1][1]) && board[0][0].equals(board[2][2])) {
            return board[0][0];
        }
        return "";
    }

    public String secondaryDiagonal() {
        if (!board[0][2].equals("") && board[0][2].equals(board[1][1]) && board[0][2].equals(board[2][0])) {
            return board[0][2];
        }
        return "";
    }

    public String verifyWinner() {
        String verify = line();
        if (!verify.equals("")) {
            return verify;
        }
        verify = column();
        if (!verify.equals("")) {
            return verify;
        }
        verify = mainDiagonal();
        if (!verify.equals("")) {
            return verify;
        }
        verify = secondaryDiagonal();
        if (!verify.equals("")) {
            return verify;
        }
        return "";
    }

    public boolean verifyDraw() {
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (board[i][j].equals("")) {
                    return false;
                }
            }
        }
        return true;
    }
}
