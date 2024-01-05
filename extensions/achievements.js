const serverURL = "https://1b3a5078-8161-4c00-aa84-5812445e5835-00-2wjazp0166yvm.worf.replit.dev/";

// fixed it
// turns out cors was off... idk why.

class RubyAchievements {
  getInfo() {
    return {
      id: 'rdTrophies',
      name: 'Achievements',
      blocks: [
        {
          opcode: 'statusReporter',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'is server okay?'
        },
        {
          opcode: 'getAchievementsFromUser',
          blockType: Scratch.BlockType.REPORTER,
          text: 'get achievements from user [USER]',
          arguments: {
            USER: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: ''
            }
          }
        },
        {
          opcode: '' //wait for gen1x to make api
        }
      ]
    };
  }

  async statusReporter() {
    try {
      let response = await Scratch.fetch(serverURL + "ping");
      let text = await response.text();

      if (text === 'pong!') {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  async getAchievements(args) {
    try {
      let response = await Scratch.fetch(serverURL + "getAchievements?user=" + args.USER);
      let text = await response.text();
      return text;
    } catch (error) {
      return "[]";
    }
  }
}

Scratch.extensions.register(new RubyAchievements());