import fs = require("fs");


class Db {

    static data: any = {}

    static users: Array<any> = []

    public static importDatabase(roomid: string): void {
        let file: string = "{}";
        try {
            file = fs.readFileSync("./databases/" + roomid + ".json").toString();
        } catch (e: any) {
            console.log(e.message);
        }
        this.data[roomid] = JSON.parse(file);
    }

    public static importDatabases(): void {
        let databases = fs.readdirSync("./databases");
        for (let i = 0, len = databases.length; i < len; i++) {
            let file = databases[i];
            if (!file.endsWith(".json")) continue;
            this.importDatabase(file.substr(0, file.indexOf(".json")));
        }
    }

    public static exportDatabase(name: string): boolean {
        if (!(name in this.data)) return false;
        fs.writeFileSync(
            "./databases/" + name + ".json",
            JSON.stringify(this.data[name])
                .split("},")
                .join("},\n")
        );
        return true;
    }

    


    public static toId(str: String): string {
        return str.replace(/[^A-Z0-9]/gi, "").toLowerCase();
    }
};

export default Db;