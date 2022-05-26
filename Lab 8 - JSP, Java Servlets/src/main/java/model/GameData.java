package model;

import java.util.concurrent.ThreadLocalRandom;

public class GameData {
    public Integer userId;

    public GameData() {
//        this.userId = ThreadLocalRandom.current().ints(1, 100).distinct().limit(1).toArray()[0];
        this.userId = 1 + (int)(Math.random() * ((100 - 1) + 1));
    }
}
