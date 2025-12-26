import HashMap from './HashMap.js';

const map = new HashMap();

function run() {
  let running = true;
  while (running) {
    const command = prompt(
      "Enter a command: set, get, has, remove, length, keys, values, entries, clear, or exit"
    );
    switch (command) {
      case "set":
        const key = prompt("Enter key:");
        const value = prompt("Enter value:");
        map.set(key, value);
        console.log(`Set '${key}' to '${value}'`);
        break;
      case "get":
        const getKey = prompt("Enter key:");
        console.log(`Value of '${getKey}':`, map.get(getKey));
        break;
      case "has":
        const hasKey = prompt("Enter key:");
        console.log(`Has '${hasKey}':`, map.has(hasKey));
        break;
      case "remove":
        const removeKey = prompt("Enter key:");
        console.log(`Removed '${removeKey}':`, map.remove(removeKey));
        break;
      case "length":
        console.log("Length:", map.length());
        break;
      case "keys":
        console.log("Keys:", map.keys());
        break;
      case "values":
        console.log("Values:", map.values());
        break;
      case "entries":
        console.log("Entries:", map.entries());
        break;
      case "clear":
        map.clear();
        console.log("Map cleared.");
        break;
      case "exit":
        running = false;
        break;
      default:
        console.log("Invalid command.");
    }
  }
}

run();