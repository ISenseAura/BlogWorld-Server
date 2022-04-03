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

	public static random(limit?: number) {
		if (!limit) limit = 2;
		return Math.floor(Math.random() * limit);
	}

	public static sampleMany<T>(array: T[], amount: string | number): T[] {
		const len = array.length;
		if (!len) throw new Error("Tools.sampleMany() does not accept empty arrays");
		if (len === 1) return array.slice();
		if (typeof amount === 'string') amount = parseInt(amount);
		if (!amount || isNaN(amount)) throw new Error("Invalid amount in Tools.sampleMany()");
		if (amount > len) amount = len;
		return this.shuffle(array).splice(0, amount);
	}

	public static sampleOne<T>(array: T[]): T {
		const len = array.length;
		if (!len) throw new Error("Tools.sampleOne() does not accept empty arrays");
		if (len === 1) return array.slice()[0];
		return this.shuffle(array)[0];
	}

	public static shuffle<T>(array: T[]): T[] {
		array = array.slice();

		// Fisher-Yates shuffle algorithm
		let currentIndex = array.length;
		let randomIndex = 0;
		let temporaryValue;

		// While there remain elements to shuffle...
		while (currentIndex !== 0) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}
    public static toId(str: String): string {
        return str.replace(/[^A-Z0-9]/gi, "").toLowerCase();
    }
};

export default Db;