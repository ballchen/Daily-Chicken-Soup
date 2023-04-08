import { ChatGPTAPI } from "chatgpt";

const ChickenSoupError = class extends Error {};

const chickenSoupMaker = class {
  constructor(opts) {
    const { apiKey, role, roles, language, temperature, top_p } = opts;
    this._apiKey = apiKey;
    this._role = role;
    this._roles = roles || [];
    this._language = language || "繁體中文";

    if (!this._apiKey) {
      throw new ChickenSoupError("apiKey is required");
    }

    this.chatApi = new ChatGPTAPI({
      apiKey: this._apiKey,
      completionParams: {
        temperature: temperature || 1.5,
        top_p: top_p || 1,
      },
    });
  }

  getImage;

  getQuestion({
    who = "有智慧的長者",
    limit = 40,
    language = this._language,
    news,
  }) {
    const need = "一句心靈雞湯的短句";

    let basic = `
      你扮演一個${who}，我需要${need}，這個${need}不能超過${limit}個字。
      回答的內容不要包含「 、 」、 "。
      你回答的內容需要以${language}為主，不能有簡體中文字。
      你回答的短句中中文與英文之間需要有空格。
      你的回答只能是這個短句，不能有其他的內容。
    `;
    if (news) {
      basic += `並且內容需要跟以下的新聞有關：\n${news}`;
    }

    return {
      text: basic,
      limit,
      who,
      news,
    };
  }

  changeRole(role) {
    this._role = role;
  }

  changeLanguage(language) {
    this._language = language;
  }

  async feed(randomRole = false, news = null) {
    let speaker = this._role;
    if (randomRole && this._roles.length > 0) {
      const randomIndex = Math.floor(Math.random() * this._roles.length);
      speaker = this._roles[randomIndex];
    }

    const soup = {
      input: "",
      text: "",
      speaker,
      hashtags: [],
    };

    const question = this.getQuestion({
      who: speaker,
      news,
    });
    let res = await this.chatApi.sendMessage(question.text);
    soup.input = question.text;
    soup.text = res.text;

    res = await this.chatApi.sendMessage(
      "幫我對這個短句下中文與英文各 3 個 hashtag。並且這 3 個 hashtag 不能重複。中英文回答不用分行，hashtag 以空格分開，回答除了 hashtags 外不用包含其他的內容。",
      {
        parentMessageId: res.id,
      }
    );

    let response = res.text.replace(/(\r\n|\n|\r)/gm, "");
    const hashtags = response.split(" ").filter((val) => {
      return !!val.length && val[0] === "#";
    });

    soup.hashtags = hashtags;

    return soup;
  }
};

export default chickenSoupMaker;
