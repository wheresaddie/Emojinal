// Generated by CoffeeScript 1.6.3
(function() {
  if (window.Emojinal == null) {
    window.Emojinal = {};
  }

  window.Emojinal.suffix = "";

  window.Emojinal.lookupTable = {};

  window.Emojinal.execute = function(src) {
    console.log(this.compile(src));
    return FJS.execute(this.compile(src));
  };

  window.Emojinal.compile = function(src) {
    return this.parser.parse(src + " " + this.suffix);
  };

  window.Emojinal.toAscii = function(text) {
    var emoji, name, _ref;
    _ref = Emojinal.names;
    for (emoji in _ref) {
      name = _ref[emoji];
      text = text.replace(new RegExp(emoji, 'g'), "_emoji_" + name + "_");
    }
    return text;
  };

  window.Emojinal.parser = PEG.buildParser("  start           = c:expression+ { return c.join(' ').replace(/ =/g, '=') }  expression      = e:(literal / emoji) space { return e }  literal         = string / number  string          = '✌' s:[^✌]+ '✌' { return '\"' + s.join('') + '\"' }  number          = d:digit+ { return parseFloat(d.join('')) }   digit           = d:ascii_digit '⃣' { return d }  ascii_digit     = [0123456789]  emoji           = e:(people_emoji / nature_emoji / object_emoji / symbol_emoji)+ { var symbol = e.join(''); return Emojinal.lookupTable[symbol] ? Emojinal.lookupTable[symbol] : Emojinal.toAscii(symbol); }  people_emoji    = '😄' / '😃' / '😀' / '😊' / '☺' / '😉' / '😍' / '😘' / '😚' / '😗' / '😙' / '😜' / '😝' / '😛' / '😳' / '😁' / '😔' / '😌' / '😒' / '😞' / '😣' / '😢' / '😂' / '😭' / '😪' / '😥' / '😰' / '😅' / '😓' / '😩' / '😫' / '😨' / '😱' / '😠' / '😡' / '😤' / '😖' / '😆' / '😋' / '😷' / '😎' / '😴' / '😵' / '😲' / '😟' / '😦' / '😧' / '😈' / '👿' / '😮' / '😬' / '😐' / '😕' / '😯' / '😶' / '😇' / '😏' / '😑' / '👲' / '👳' / '👮' / '👷' / '💂' / '👶' / '👦' / '👧' / '👨' / '👩' / '👴' / '👵' / '👱' / '👼' / '👸' / '😺' / '😸' / '😻' / '😽' / '😼' / '🙀' / '😿' / '😹' / '😾' / '👹' / '👺' / '🙈' / '🙉' / '🙊' / '💀' / '👽' / '💩' / '🔥' / '✨' / '🌟' / '💫' / '💥' / '💢' / '💦' / '💧' / '💤' / '💨' / '👂' / '👀' / '👃' / '👅' / '👄' / '👍' / '👎' / '👌' / '👊' / '✊' / '✌' / '👋' / '✋' / '👐' / '👆' / '👇' / '👉' / '👈' / '🙌' / '🙏' / '☝' / '👏' / '💪' / '🚶' / '🏃' / '💃' / '👫' / '👪' / '👬' / '👭' / '💏' / '💑' / '👯' / '🙆' / '🙅' / '💁' / '🙋' / '💆' / '💇' / '💅' / '👰' / '🙎' / '🙍' / '🙇' / '🎩' / '👑' / '👒' / '👟' / '👞' / '👡' / '👠' / '👢' / '👕' / '👔' / '👚' / '👗' / '🎽' / '👖' / '👘' / '👙' / '💼' / '👜' / '👝' / '👛' / '👓' / '🎀' / '🌂' / '💄' / '💛' / '💙' / '💜' / '💚' / '❤' / '💔' / '💗' / '💓' / '💕' / '💖' / '💞' / '💘' / '💌' / '💋' / '💍' / '💎' / '👤' / '👥' / '💬' / '👣' / '💭'   nature_emoji    = '🐶' / '🐺' / '🐱' / '🐭' / '🐹' / '🐰' / '🐸' / '🐯' / '🐨' / '🐻' / '🐷' / '🐽' / '🐮' / '🐗' / '🐵' / '🐒' / '🐴' / '🐑' / '🐘' / '🐼' / '🐧' / '🐦' / '🐤' / '🐥' / '🐣' / '🐔' / '🐍' / '🐢' / '🐛' / '🐝' / '🐜' / '🐞' / '🐌' / '🐙' / '🐚' / '🐠' / '🐟' / '🐬' / '🐳' / '🐋' / '🐄' / '🐏' / '🐀' / '🐃' / '🐅' / '🐇' / '🐉' / '🐎' / '🐐' / '🐓' / '🐕' / '🐖' / '🐁' / '🐂' / '🐲' / '🐡' / '🐊' / '🐫' / '🐪' / '🐆' / '🐈' / '🐩' / '🐾' / '💐' / '🌸' / '🌷' / '🍀' / '🌹' / '🌻' / '🌺' / '🍁' / '🍃' / '🍂' / '🌿' / '🌾' / '🍄' / '🌵' / '🌴' / '🌲' / '🌳' / '🌰' / '🌱' / '🌼' / '🌐' / '🌞' / '🌝' / '🌚' / '🌑' / '🌒' / '🌓' / '🌔' / '🌕' / '🌖' / '🌗' / '🌘' / '🌜' / '🌛' / '🌙' / '🌍' / '🌎' / '🌏' / '🌋' / '🌌' / '🌠' / '⭐' / '☀' / '⛅' / '☁' / '⚡' / '☔' / '❄' / '⛄' / '🌀' / '🌁' / '🌈' / '🌊'  object_emoji    = '🎍' / '💝' / '🎎' / '🎒' / '🎓' / '🎏' / '🎆' / '🎇' / '🎐' / '🎑' / '🎃' / '👻' / '🎅' / '🎄' / '🎁' / '🎋' / '🎉' / '🎊' / '🎈' / '🎌' / '🔮' / '🎥' / '📷' / '📹' / '📼' / '💿' / '📀' / '💽' / '💾' / '💻' / '📱' / '☎' / '📞' / '📟' / '📠' / '📡' / '📺' / '📻' / '🔊' / '🔉' / '🔈' / '🔇' / '🔔' / '🔕' / '📢' / '📣' / '⏳' / '⌛' / '⏰' / '⌚' / '🔓' / '🔒' / '🔏' / '🔐' / '🔑' / '🔎' / '💡' / '🔦' / '🔆' / '🔅' / '🔌' / '🔋' / '🔍' / '🛁' / '🛀' / '🚿' / '🚽' / '🔧' / '🔩' / '🔨' / '🚪' / '🚬' / '💣' / '🔫' / '🔪' / '💊' / '💉' / '💰' / '💴' / '💵' / '💷' / '💶' / '💳' / '💸' / '📲' / '📧' / '📥' / '📤' / '✉' / '📩' / '📨' / '📯' / '📫' / '📪' / '📬' / '📭' / '📮' / '📦' / '📝' / '📄' / '📃' / '📑' / '📊' / '📈' / '📉' / '📜' / '📋' / '📅' / '📆' / '📇' / '📁' / '📂' / '✂' / '📌' / '📎' / '✒' / '✏' / '📏' / '📐' / '📕' / '📗' / '📘' / '📙' / '📓' / '📔' / '📒' / '📚' / '📖' / '🔖' / '📛' / '🔬' / '🔭' / '📰' / '🎨' / '🎬' / '🎤' / '🎧' / '🎼' / '🎵' / '🎶' / '🎹' / '🎻' / '🎺' / '🎷' / '🎸' / '👾' / '🎮' / '🃏' / '🎴' / '🀄' / '🎲' / '🎯' / '🏈' / '🏀' / '⚽' / '⚾' / '🎾' / '🎱' / '🏉' / '🎳' / '⛳' / '🚵' / '🚴' / '🏁' / '🏇' / '🏆' / '🎿' / '🏂' / '🏊' / '🏄' / '🎣' / '☕' / '🍵' / '🍶' / '🍼' / '🍺' / '🍻' / '🍸' / '🍹' / '🍷' / '🍴' / '🍕' / '🍔' / '🍟' / '🍗' / '🍖' / '🍝' / '🍛' / '🍤' / '🍱' / '🍣' / '🍥' / '🍙' / '🍘' / '🍚' / '🍜' / '🍲' / '🍢' / '🍡' / '🍳' / '🍞' / '🍩' / '🍮' / '🍦' / '🍨' / '🍧' / '🎂' / '🍰' / '🍪' / '🍫' / '🍬' / '🍭' / '🍯' / '🍎' / '🍏' / '🍊' / '🍋' / '🍒' / '🍇' / '🍉' / '🍓' / '🍑' / '🍈' / '🍌' / '🍐' / '🍍' / '🍠' / '🍆' / '🍅' / '🌽'  places_emoji    = '🏠' / '🏡' / '🏫' / '🏢' / '🏣' / '🏥' / '🏦' / '🏪' / '🏩' / '🏨' / '💒' / '⛪' / '🏬' / '🏤' / '🌇' / '🌆' / '🏯' / '🏰' / '⛺' / '🏭' / '🗼' / '🗾' / '🗻' / '🌄' / '🌅' / '🌃' / '🗽' / '🌉' / '🎠' / '🎡' / '⛲' / '🎢' / '🚢' / '⛵' / '🚤' / '🚣' / '⚓' / '🚀' / '✈' / '💺' / '🚁' / '🚂' / '🚊' / '🚉' / '🚞' / '🚆' / '🚄' / '🚅' / '🚈' / '🚇' / '🚝' / '🚋' / '🚃' / '🚎' / '🚌' / '🚍' / '🚙' / '🚘' / '🚗' / '🚕' / '🚖' / '🚛' / '🚚' / '🚨' / '🚓' / '🚔' / '🚒' / '🚑' / '🚐' / '🚲' / '🚡' / '🚟' / '🚠' / '🚜' / '💈' / '🚏' / '🎫' / '🚦' / '🚥' / '⚠' / '🚧' / '🔰' / '⛽' / '🏮' / '🎰' / '♨' / '🗿' / '🎪' / '🎭' / '📍' / '🚩'  symbol_emoji    = '1⃣' / '2⃣' / '3⃣' / '4⃣' / '5⃣' / '6⃣' / '7⃣' / '8⃣' / '9⃣' / '0⃣' / '🔟' / '🔢' / '#⃣' / '🔣' / '⬆' / '⬇' / '⬅' / '➡' / '🔠' / '🔡' / '🔤' / '↗' / '↖' / '↘' / '↙' / '↔' / '↕' / '🔄' / '◀' / '▶' / '🔼' / '🔽' / '↩' / '↪' / 'ℹ' / '⏪' / '⏩' / '⏫' / '⏬' / '⤵' / '⤴' / '🆗' / '🔀' / '🔁' / '🔂' / '🆕' / '🆙' / '🆒' / '🆓' / '🆖' / '📶' / '🎦' / '🈁' / '🈯' / '🈳' / '🈵' / '🈴' / '🈲' / '🉐' / '🈹' / '🈺' / '🈶' / '🈚' / '🚻' / '🚹' / '🚺' / '🚼' / '🚾' / '🚰' / '🚮' / '🅿' / '♿' / '🚭' / '🈷' / '🈸' / '🈂' / 'Ⓜ' / '🛂' / '🛄' / '🛅' / '🛃' / '🉑' / '㊙' / '㊗' / '🆑' / '🆘' / '🆔' / '🚫' / '🔞' / '📵' / '🚯' / '🚱' / '🚳' / '🚷' / '🚸' / '⛔' / '✳' / '❇' / '❎' / '✅' / '✴' / '💟' / '🆚' / '📳' / '📴' / '🅰' / '🅱' / '🆎' / '🅾' / '💠' / '➿' / '♻' / '♈' / '♉' / '♊' / '♋' / '♌' / '♍' / '♎' / '♏' / '♐' / '♑' / '♒' / '♓' / '⛎' / '🔯' / '🏧' / '💹' / '💲' / '💱' / '©' / '®' / '™' / '❌' / '‼' / '⁉' / '❗' / '❓' / '❕' / '❔' / '⭕' / '🔝' / '🔚' / '🔙' / '🔛' / '🔜' / '🔃' / '🕛' / '🕧' / '🕐' / '🕜' / '🕑' / '🕝' / '🕒' / '🕞' / '🕓' / '🕟' / '🕔' / '🕠' / '🕕' / '🕖' / '🕗' / '🕘' / '🕙' / '🕚' / '🕡' / '🕢' / '🕣' / '🕤' / '🕥' / '🕦' / '✖' / '➕' / '➖' / '➗' / '♠' / '♥' / '♣' / '♦' / '💮' / '💯' / '✔' / '☑' / '🔘' / '🔗' / '➰' / '〰' / '〽' / '🔱' / '◼' / '◻' / '◾' / '◽' / '▪' / '▫' / '🔺' / '🔲' / '🔳' / '⚫' / '⚪' / '🔴' / '🔵' / '🔻' / '⬜' / '⬛' / '🔶' / '🔷' / '🔸' / '🔹'  space           = [\\n\\uFE0F ]* { return undefined }  mandatory_space = [\\n\\uFE0F ]+ { return undefined }  ");

  window.Emojinal.lookupTable = {
    "◀": "=",
    "👍": "true",
    "👎": "false",
    "✖": "*",
    "➗": "/",
    "➕": "+",
    "➖": "-",
    "💻": ".",
    "❗": "not",
    "⬇": "drop",
    "🆕": "dup",
    "🔀": "swap",
    "❓": "if",
    "🔄": "repeat",
    "🌜": ":(",
    "🌛": ")",
    "🔺": ">",
    "🔻": "<",
    "🔟": "10",
    "💯": "100"
  };

  window.Emojinal.names = {
    "😄": "smiling_face_with_open_mouth_and_smiling_eyes",
    "😃": "smiling_face_with_open_mouth",
    "😀": "grinning_face",
    "😊": "smiling_face_with_smiling_eyes",
    "☺": "white_smiling_face",
    "😉": "winking_face",
    "😍": "smiling_face_with_heart_shaped_eyes",
    "😘": "face_throwing_a_kiss",
    "😚": "kissing_face_with_closed_eyes",
    "😗": "kissing_face",
    "😙": "kissing_face_with_smiling_eyes",
    "😜": "face_with_stuck_out_tongue_and_winking_eye",
    "😝": "face_with_stuck_out_tongue_and_tightly_closed_eyes",
    "😛": "face_with_stuck_out_tongue",
    "😳": "flushed_face",
    "😁": "grinning_face_with_smiling_eyes",
    "😔": "pensive_face",
    "😌": "relieved_face",
    "😒": "unamused_face",
    "😞": "disappointed_face",
    "😣": "persevering_face",
    "😢": "crying_face",
    "😂": "face_with_tears_of_joy",
    "😭": "loudly_crying_face",
    "😪": "sleepy_face",
    "😥": "disappointed_but_relieved_face",
    "😰": "face_with_open_mouth_and_cold_sweat",
    "😅": "smiling_face_with_open_mouth_and_cold_sweat",
    "😓": "face_with_cold_sweat",
    "😩": "weary_face",
    "😫": "tired_face",
    "😨": "fearful_face",
    "😱": "face_screaming_in_fear",
    "😠": "angry_face",
    "😡": "pouting_face",
    "😤": "face_with_look_of_triumph",
    "😖": "confounded_face",
    "😆": "smiling_face_with_open_mouth_and_tightly_closed_eyes",
    "😋": "face_savouring_delicious_food",
    "😷": "face_with_medical_mask",
    "😎": "smiling_face_with_sunglasses",
    "😴": "sleeping_face",
    "😵": "dizzy_face",
    "😲": "astonished_face",
    "😟": "worried_face",
    "😦": "frowning_face_with_open_mouth",
    "😧": "anguished_face",
    "😈": "smiling_face_with_horns",
    "👿": "imp",
    "😮": "face_with_open_mouth",
    "😬": "grimacing_face",
    "😐": "neutral_face",
    "😕": "confused_face",
    "😯": "hushed_face",
    "😶": "face_without_mouth",
    "😇": "smiling_face_with_halo",
    "😏": "smirking_face",
    "😑": "expressionless_face",
    "👲": "man_with_gua_pi_mao",
    "👳": "man_with_turban",
    "👮": "police_officer",
    "👷": "construction_worker",
    "💂": "guardsman",
    "👶": "baby",
    "👦": "boy",
    "👧": "girl",
    "👨": "man",
    "👩": "woman",
    "👴": "older_man",
    "👵": "older_woman",
    "👱": "person_with_blond_hair",
    "👼": "baby_angel",
    "👸": "princess",
    "😺": "smiling_cat_face_with_open_mouth",
    "😸": "grinning_cat_face_with_smiling_eyes",
    "😻": "smiling_cat_face_with_heart_shaped_eyes",
    "😽": "kissing_cat_face_with_closed_eyes",
    "😼": "cat_face_with_wry_smile",
    "🙀": "weary_cat_face",
    "😿": "crying_cat_face",
    "😹": "cat_face_with_tears_of_joy",
    "😾": "pouting_cat_face",
    "👹": "japanese_ogre",
    "👺": "japanese_goblin",
    "🙈": "see_no_evil_monkey",
    "🙉": "hear_no_evil_monkey",
    "🙊": "speak_no_evil_monkey",
    "💀": "skull",
    "👽": "extraterrestrial_alien",
    "💩": "pile_of_poo",
    "🔥": "fire",
    "✨": "_sparkles",
    "🌟": "glowing_star",
    "💫": "dizzy_symbol",
    "💥": "collision_symbol",
    "💢": "anger_symbol",
    "💦": "splashing_sweat_symbol",
    "💧": "droplet",
    "💤": "sleeping_symbol",
    "💨": "dash_symbol",
    "👂": "ear",
    "👀": "eyes",
    "👃": "nose",
    "👅": "tongue",
    "👄": "mouth",
    "👍": "thumbs_up_sign",
    "👎": "thumbs_down_sign",
    "👌": "ok_hand_sign",
    "👊": "fisted_hand_sign",
    "✊": "_raised_fist",
    "✌": "_victory_hand",
    "👋": "waving_hand_sign",
    "✋": "_raised_hand",
    "👐": "open_hands_sign",
    "👆": "white_up_pointing_backhand_index",
    "👇": "white_down_pointing_backhand_index",
    "👉": "white_right_pointing_backhand_index",
    "👈": "white_left_pointing_backhand_index",
    "🙌": "person_raising_both_hands_in_celebration",
    "🙏": "person_with_folded_hands",
    "☝": "_white_up_pointing_index",
    "👏": "clapping_hands_sign",
    "💪": "flexed_biceps",
    "🚶": "pedestrian",
    "🏃": "runner",
    "💃": "dancer",
    "👫": "man_and_woman_holding_hands",
    "👪": "family",
    "👬": "two_men_holding_hands",
    "👭": "two_women_holding_hands",
    "💏": "kiss",
    "💑": "couple_with_heart",
    "👯": "woman_with_bunny_ears",
    "🙆": "face_with_ok_gesture",
    "🙅": "face_with_no_good_gesture",
    "💁": "information_desk_person",
    "🙋": "happy_person_raising_one_hand",
    "💆": "face_massage",
    "💇": "haircut",
    "💅": "nail_polish",
    "👰": "bride_with_veil",
    "🙎": "person_with_pouting_face",
    "🙍": "person_frowning",
    "🙇": "person_bowing_deeply",
    "🎩": "top_hat",
    "👑": "crown",
    "👒": "womans_hat",
    "👟": "athletic_shoe",
    "👞": "mans_shoe",
    "👡": "womans_sandal",
    "👠": "high_heeled_shoe",
    "👢": "womans_boots",
    "👕": "t_shirt",
    "👔": "necktie",
    "👚": "womans_clothes",
    "👗": "dress",
    "🎽": "running_shirt_with_sash",
    "👖": "jeans",
    "👘": "kimono",
    "👙": "bikini",
    "💼": "briefcase",
    "👜": "handbag",
    "👝": "pouch",
    "👛": "purse",
    "👓": "eyeglasses",
    "🎀": "ribbon",
    "🌂": "closed_umbrella",
    "💄": "lipstick",
    "💛": "yellow_heart",
    "💙": "blue_heart",
    "💜": "purple_heart",
    "💚": "green_heart",
    "❤": " heavy_black_heart",
    "💔": "broken_heart",
    "💗": "growing_heart",
    "💓": "beating_heart",
    "💕": "two_hearts",
    "💖": "sparkling_heart",
    "💞": "revolving_hearts",
    "💘": "heart_with_arrow",
    "💌": "love_letter",
    "💋": "kiss_mark",
    "💍": "ring",
    "💎": "gem_stone",
    "👤": "bust_in_silhouette",
    "👥": "busts_in_silhouette",
    "💬": "speech_balloon",
    "👣": "footprints",
    "💭": "thought_balloon",
    "🐶": "dog_face",
    "🐺": "wolf_face",
    "🐱": "cat_face",
    "🐭": "mouse_face",
    "🐹": "hamster_face",
    "🐰": "rabbit_face",
    "🐸": "frog_face",
    "🐯": "tiger_face",
    "🐨": "koala",
    "🐻": "bear_face",
    "🐷": "pig_face",
    "🐽": "pig_nose",
    "🐮": "cow_face",
    "🐗": "boar",
    "🐵": "monkey_face",
    "🐒": "monkey",
    "🐴": "horse_face",
    "🐑": "sheep",
    "🐘": "elephant",
    "🐼": "panda_face",
    "🐧": "penguin",
    "🐦": "bird",
    "🐤": "baby_chick",
    "🐥": "front_facing_baby_chick",
    "🐣": "hatching_chick",
    "🐔": "chicken",
    "🐍": "snake",
    "🐢": "turtle",
    "🐛": "bug",
    "🐝": "honeybee",
    "🐜": "ant",
    "🐞": "lady_beetle",
    "🐌": "snail",
    "🐙": "octopus",
    "🐚": "spiral_shell",
    "🐠": "tropical_fish",
    "🐟": "fish",
    "🐬": "dolphin",
    "🐳": "spouting_whale",
    "🐋": "whale",
    "🐄": "cow",
    "🐏": "ram",
    "🐀": "rat",
    "🐃": "water_buffalo",
    "🐅": "tiger",
    "🐇": "rabbit",
    "🐉": "dragon",
    "🐎": "horse",
    "🐐": "goat",
    "🐓": "rooster",
    "🐕": "dog",
    "🐖": "pig",
    "🐁": "mouse",
    "🐂": "ox",
    "🐲": "dragon_face",
    "🐡": "blowfish",
    "🐊": "crocodile",
    "🐫": "bactrian_camel",
    "🐪": "dromedary_camel",
    "🐆": "leopard",
    "🐈": "cat",
    "🐩": "poodle",
    "🐾": "paw_prints",
    "💐": "bouquet",
    "🌸": "cherry_blossom",
    "🌷": "tulip",
    "🍀": "four_leaf_clover",
    "🌹": "rose",
    "🌻": "sunflower",
    "🌺": "hibiscus",
    "🍁": "maple_leaf",
    "🍃": "leaf_fluttering_in_wind",
    "🍂": "fallen_leaf",
    "🌿": "herb",
    "🌾": "ear_of_rice",
    "🍄": "mushroom",
    "🌵": "cactus",
    "🌴": "palm_tree",
    "🌲": "evergreen_tree",
    "🌳": "deciduous_tree",
    "🌰": "chestnut",
    "🌱": "seedling",
    "🌼": "blossom",
    "🌐": "globe_with_meridians",
    "🌞": "sun_with_face",
    "🌝": "full_moon_with_face",
    "🌚": "new_moon_with_face",
    "🌑": "new_moon_symbol",
    "🌒": "waxing_crescent_moon_symbol",
    "🌓": "first_quarter_moon_symbol",
    "🌔": "waxing_gibbous_moon_symbol",
    "🌕": "full_moon_symbol",
    "🌖": "waning_gibbous_moon_symbol",
    "🌗": "last_quarter_moon_symbol",
    "🌘": "waning_crescent_moon_symbol",
    "🌜": "last_quarter_moon_with_face",
    "🌛": "first_quarter_moon_with_face",
    "🌙": "crescent_moon",
    "🌍": "earth_globe_europe_africa",
    "🌎": "earth_globe_americas",
    "🌏": "earth_globe_asia_australia",
    "🌋": "volcano",
    "🌌": "milky_way",
    "🌠": "shooting_star",
    "⭐": "white_medium_star",
    "☀": "black_sun_with_rays",
    "⛅": "sun_behind_cloud",
    "☁": "cloud",
    "⚡": "high_voltage_sign",
    "☔": "umbrella_with_rain_drops",
    "❄": "snowflake",
    "⛄": "snowman_without_snow",
    "🌀": "cyclone",
    "🌁": "foggy",
    "🌈": "rainbow",
    "🌊": "water_wave",
    "🎍": "pine_decoration",
    "💝": "heart_with_ribbon",
    "🎎": "japanese_dolls",
    "🎒": "school_satchel",
    "🎓": "graduation_cap",
    "🎏": "carp_streamer",
    "🎆": "fireworks",
    "🎇": "firework_sparkler",
    "🎐": "wind_chime",
    "🎑": "moon_viewing_ceremony",
    "🎃": "jack_o_lantern",
    "👻": "ghost",
    "🎅": "father_christmas",
    "🎄": "christmas_tree",
    "🎁": "wrapped_present",
    "🎋": "tanabata_tree",
    "🎉": "party_popper",
    "🎊": "confetti_ball",
    "🎈": "balloon",
    "🎌": "crossed_flags",
    "🔮": "crystal_ball",
    "🎥": "movie_camera",
    "📷": "camera",
    "📹": "video_camera",
    "📼": "videocassette",
    "💿": "optical_disc",
    "📀": "dvd",
    "💽": "minidisc",
    "💾": "floppy_disk",
    "💻": "personal_computer",
    "📱": "mobile_phone",
    "☎": "black_telephone",
    "📞": "telephone_receiver",
    "📟": "pager",
    "📠": "fax_machine",
    "📡": "satellite_antenna",
    "📺": "television",
    "📻": "radio",
    "🔊": "speaker_with_three_sound_waves",
    "🔉": "speaker_with_one_sound_wave",
    "🔈": "speaker",
    "🔇": "speaker_with_cancellation_stroke",
    "🔔": "bell",
    "🔕": "bell_with_cancellation_stroke",
    "📢": "public_address_loudspeaker",
    "📣": "cheering_megaphone",
    "⏳": "hourglass_with_flowing_sand",
    "⌛": "hourglass",
    "⏰": "alarm_clock",
    "⌚": "watch",
    "🔓": "open_lock",
    "🔒": "lock",
    "🔏": "lock_with_ink_pen",
    "🔐": "closed_lock_with_key",
    "🔑": "key",
    "🔎": "right_pointing_magnifying_glass",
    "💡": "electric_light_bulb",
    "🔦": "electric_torch",
    "🔆": "high_brightness_symbol",
    "🔅": "low_brightness_symbol",
    "🔌": "electric_plug",
    "🔋": "battery",
    "🔍": "left_pointing_magnifying_glass",
    "🛁": "bathtub",
    "🛀": "bath",
    "🚿": "shower",
    "🚽": "toilet",
    "🔧": "wrench",
    "🔩": "nut_and_bolt",
    "🔨": "hammer",
    "🚪": "door",
    "🚬": "smoking_symbol",
    "💣": "bomb",
    "🔫": "pistol",
    "🔪": "hocho",
    "💊": "pill",
    "💉": "syringe",
    "💰": "money_bag",
    "💴": "banknote_with_yen_sign",
    "💵": "banknote_with_dollar_sign",
    "💷": "banknote_with_pound_sign",
    "💶": "banknote_with_euro_sign",
    "💳": "credit_card",
    "💸": "money_with_wings",
    "📲": "mobile_phone_with_rightwards_arrow_at_left",
    "📧": "e_mail_symbol",
    "📥": "inbox_tray",
    "📤": "outbox_tray",
    "✉": "envelope",
    "📩": "envelope_with_downwards_arrow_above",
    "📨": "incoming_envelope",
    "📯": "postal_horn",
    "📫": "closed_mailbox_with_raised_flag",
    "📪": "closed_mailbox_with_lowered_flag",
    "📬": "open_mailbox_with_raised_flag",
    "📭": "open_mailbox_with_lowered_flag",
    "📮": "postbox",
    "📦": "package",
    "📝": "memo",
    "📄": "page_facing_up",
    "📃": "page_with_curl",
    "📑": "bookmark_tabs",
    "📊": "bar_chart",
    "📈": "chart_with_upwards_trend",
    "📉": "chart_with_downwards_trend",
    "📜": "scroll",
    "📋": "clipboard",
    "📅": "calendar",
    "📆": "tear_off_calendar",
    "📇": "card_index",
    "📁": "file_folder",
    "📂": "open_file_folder",
    "✂": "black_scissors",
    "📌": "pushpin",
    "📎": "paperclip",
    "✒": "black_nib",
    "✏": "pencil",
    "📏": "straight_ruler",
    "📐": "triangular_ruler",
    "📕": "closed_book",
    "📗": "green_book",
    "📘": "blue_book",
    "📙": "orange_book",
    "📓": "notebook",
    "📔": "notebook_with_decorative_cover",
    "📒": "ledger",
    "📚": "books",
    "📖": "open_book",
    "🔖": "bookmark",
    "📛": "name_badge",
    "🔬": "microscope",
    "🔭": "telescope",
    "📰": "newspaper",
    "🎨": "artist_palette",
    "🎬": "clapper_board",
    "🎤": "microphone",
    "🎧": "headphone",
    "🎼": "musical_score",
    "🎵": "musical_note",
    "🎶": "multiple_musical_notes",
    "🎹": "musical_keyboard",
    "🎻": "violin",
    "🎺": "trumpet",
    "🎷": "saxophone",
    "🎸": "guitar",
    "👾": "alien_monster",
    "🎮": "video_game",
    "🃏": "playing_card_black_joker",
    "🎴": "flower_playing_cards",
    "🀄": "mahjong_tile_red_dragon",
    "🎲": "game_die",
    "🎯": "direct_hit",
    "🏈": "american_football",
    "🏀": "basketball_and_hoop",
    "⚽": "soccer_ball",
    "⚾": "baseball",
    "🎾": "tennis_racquet_and_ball",
    "🎱": "billiards",
    "🏉": "rugby_football",
    "🎳": "bowling",
    "⛳": "flag_in_hole",
    "🚵": "mountain_bicyclist",
    "🚴": "bicyclist",
    "🏁": "chequered_flag",
    "🏇": "horse_racing",
    "🏆": "trophy",
    "🎿": "ski_and_ski_boot",
    "🏂": "snowboarder",
    "🏊": "swimmer",
    "🏄": "surfer",
    "🎣": "fishing_pole_and_fish",
    "☕": "hot_beverage",
    "🍵": "teacup_without_handle",
    "🍶": "sake_bottle_and_cup",
    "🍼": "baby_bottle",
    "🍺": "beer_mug",
    "🍻": "clinking_beer_mugs",
    "🍸": "cocktail_glass",
    "🍹": "tropical_drink",
    "🍷": "wine_glass",
    "🍴": "fork_and_knife",
    "🍕": "slice_of_pizza",
    "🍔": "hamburger",
    "🍟": "french_fries",
    "🍗": "poultry_leg",
    "🍖": "meat_on_bone",
    "🍝": "spaghetti",
    "🍛": "curry_and_rice",
    "🍤": "fried_shrimp",
    "🍱": "bento_box",
    "🍣": "sushi",
    "🍥": "fish_cake_with_swirl_design",
    "🍙": "rice_ball",
    "🍘": "rice_cracker",
    "🍚": "cooked_rice",
    "🍜": "steaming_bowl",
    "🍲": "pot_of_food",
    "🍢": "oden",
    "🍡": "dango",
    "🍳": "cooking",
    "🍞": "bread",
    "🍩": "doughnut",
    "🍮": "custard",
    "🍦": "soft_ice_cream",
    "🍨": "ice_cream",
    "🍧": "shaved_ice",
    "🎂": "birthday_cake",
    "🍰": "shortcake",
    "🍪": "cookie",
    "🍫": "chocolate_bar",
    "🍬": "candy",
    "🍭": "lollipop",
    "🍯": "honey_pot",
    "🍎": "red_apple",
    "🍏": "green_apple",
    "🍊": "tangerine",
    "🍋": "lemon",
    "🍒": "cherries",
    "🍇": "grapes",
    "🍉": "watermelon",
    "🍓": "strawberry",
    "🍑": "peach",
    "🍈": "melon",
    "🍌": "banana",
    "🍐": "pear",
    "🍍": "pineapple",
    "🍠": "roasted_sweet_potato",
    "🍆": "aubergine",
    "🍅": "tomato",
    "🌽": "ear_of_maize",
    "🏠": "house_building",
    "🏡": "house_with_garden",
    "🏫": "school",
    "🏢": "office_building",
    "🏣": "japanese_post_office",
    "🏥": "hospital",
    "🏦": "bank",
    "🏪": "convenience_store",
    "🏩": "love_hotel",
    "🏨": "hotel",
    "💒": "wedding",
    "⛪": "church",
    "🏬": "department_store",
    "🏤": "european_post_office",
    "🌇": "sunset_over_buildings",
    "🌆": "cityscape_at_dusk",
    "🏯": "japanese_castle",
    "🏰": "european_castle",
    "⛺": "tent",
    "🏭": "factory",
    "🗼": "tokyo_tower",
    "🗾": "silhouette_of_japan",
    "🗻": "mount_fuji",
    "🌄": "sunrise_over_mountains",
    "🌅": "sunrise",
    "🌃": "night_with_stars",
    "🗽": "statue_of_liberty",
    "🌉": "bridge_at_night",
    "🎠": "carousel_horse",
    "🎡": "ferris_wheel",
    "⛲": "fountain",
    "🎢": "roller_coaster",
    "🚢": "ship",
    "⛵": "sailboat",
    "🚤": "speedboat",
    "🚣": "rowboat",
    "⚓": "anchor",
    "🚀": "rocket",
    "✈": "airplane",
    "💺": "seat",
    "🚁": "helicopter",
    "🚂": "steam_locomotive",
    "🚊": "tram",
    "🚉": "station",
    "🚞": "mountain_railway",
    "🚆": "train",
    "🚄": "high_speed_train",
    "🚅": "high_speed_train_with_bullet_nose",
    "🚈": "light_rail",
    "🚇": "metro",
    "🚝": "monorail",
    "🚋": "tram_car",
    "🚃": "railway_car",
    "🚎": "trolleybus",
    "🚌": "bus",
    "🚍": "oncoming_bus",
    "🚙": "recreational_vehicle",
    "🚘": "oncoming_automobile",
    "🚗": "automobile",
    "🚕": "taxi",
    "🚖": "oncoming_taxi",
    "🚛": "articulated_lorry",
    "🚚": "delivery_truck",
    "🚨": "police_cars_revolving_light",
    "🚓": "police_car",
    "🚔": "oncoming_police_car",
    "🚒": "fire_engine",
    "🚑": "ambulance",
    "🚐": "minibus",
    "🚲": "bicycle",
    "🚡": "aerial_tramway",
    "🚟": "suspension_railway",
    "🚠": "mountain_cableway",
    "🚜": "tractor",
    "💈": "barber_pole",
    "🚏": "bus_stop",
    "🎫": "ticket",
    "🚦": "vertical_traffic_light",
    "🚥": "horizontal_traffic_light",
    "⚠": "warning_sign",
    "🚧": "construction_sign",
    "🔰": "japanese_symbol_for_beginner",
    "⛽": "fuel_pump",
    "🏮": "izakaya_lantern",
    "🎰": "slot_machine",
    "♨": "hot_springs",
    "🗿": "moyai",
    "🎪": "circus_tent",
    "🎭": "performing_arts",
    "📍": "round_pushpin",
    "🚩": "triangular_flag_on_post",
    "1⃣": "keycap_1",
    "2⃣": "keycap_2",
    "3⃣": "keycap_3",
    "4⃣": "keycap_4",
    "5⃣": "keycap_5",
    "6⃣": "keycap_6",
    "7⃣": "keycap_7",
    "8⃣": "keycap_8",
    "9⃣": "keycap_9",
    "0⃣": "keycap_0",
    "🔟": "keycap_ten",
    "🔢": "input_symbol_for_numbers",
    "#⃣": "hash_key",
    "🔣": "input_symbol_for_symbols",
    "⬆": "upwards_black_arrow",
    "⬇": "downwards_black_arrow",
    "⬅": "leftwards_black_arrow",
    "➡": "black_rightwards_arrow",
    "🔠": "input_symbol_for_latin_capital_letters",
    "🔡": "input_symbol_for_latin_small_letters",
    "🔤": "input_symbol_for_latin_letters",
    "↗": "north_east_arrow",
    "↖": "north_west_arrow",
    "↘": "south_east_arrow",
    "↙": "south_west_arrow",
    "↔": "left_right_arrow",
    "↕": "up_down_arrow",
    "🔄": "anticlockwise_downwards_and_upwards_open_circle_arrows",
    "◀": "black_left_pointing_triangle",
    "▶": "black_right_pointing_triangle",
    "🔼": "up_pointing_small_red_triangle",
    "🔽": "down_pointing_small_red_triangle",
    "↩": "leftwards_arrow_with_hook",
    "↪": "rightwards_arrow_with_hook",
    "ℹ": "information_source",
    "⏪": "black_left_pointing_double_triangle",
    "⏩": "black_right_pointing_double_triangle",
    "⏫": "black_up_pointing_double_triangle",
    "⏬": "black_down_pointing_double_triangle",
    "⤵": "arrow_pointing_rightwards_then_curving_downwards",
    "⤴": "arrow_pointing_rightwards_then_curving_upwards",
    "🆗": "squared_ok",
    "🔀": "twisted_rightwards_arrows",
    "🔁": "clockwise_rightwards_and_leftwards_open_circle_arrows",
    "🔂": "clockwise_rightwards_and_leftwards_open_circle_arrows_with_circled_one_overlay",
    "🆕": "squared_new",
    "🆙": "squared_up_with_exclamation_mark",
    "🆒": "squared_cool",
    "🆓": "squared_free",
    "🆖": "squared_ng",
    "📶": "antenna_with_bars",
    "🎦": "cinema",
    "🈁": "squared_katakana_koko",
    "🈯": "squared_cjk_unified_ideograph_6307",
    "🈳": "squared_cjk_unified_ideograph_7a7a",
    "🈵": "squared_cjk_unified_ideograph_6e80",
    "🈴": "squared_cjk_unified_ideograph_5408",
    "🈲": "squared_cjk_unified_ideograph_7981",
    "🉐": "circled_ideograph_advantage",
    "🈹": "squared_cjk_unified_ideograph_5272",
    "🈺": "squared_cjk_unified_ideograph_55b6",
    "🈶": "squared_cjk_unified_ideograph_6709",
    "🈚": "squared_cjk_unified_ideograph_7121",
    "🚻": "restroom",
    "🚹": "mens_symbol",
    "🚺": "womens_symbol",
    "🚼": "baby_symbol",
    "🚾": "water_closet",
    "🚰": "potable_water_symbol",
    "🚮": "put_litter_in_its_place_symbol",
    "🅿": "negative_squared_latin_capital_letter_p",
    "♿": "wheelchair_symbol",
    "🚭": "no_smoking_symbol",
    "🈷": "squared_cjk_unified_ideograph_6708",
    "🈸": "squared_cjk_unified_ideograph_7533",
    "🈂": "squared_katakana_sa",
    "Ⓜ": "circled_latin_capital_letter_m",
    "🛂": "passport_control",
    "🛄": "baggage_claim",
    "🛅": "left_luggage",
    "🛃": "customs",
    "🉑": "circled_ideograph_accept",
    "㊙": "circled_ideograph_secret",
    "㊗": "circled_ideograph_congratulation",
    "🆑": "squared_cl",
    "🆘": "squared_sos",
    "🆔": "squared_id",
    "🚫": "no_entry_sign",
    "🔞": "no_one_under_eighteen_symbol",
    "📵": "no_mobile_phones",
    "🚯": "do_not_litter_symbol",
    "🚱": "non_potable_water_symbol",
    "🚳": "no_bicycles",
    "🚷": "no_pedestrians",
    "🚸": "children_crossing",
    "⛔": "no_entry",
    "✳": "eight_spoked_asterisk",
    "❇": "sparkle",
    "❎": "negative_squared_cross_mark",
    "✅": "white_heavy_check_mark",
    "✴": "eight_pointed_black_star",
    "💟": "heart_decoration",
    "🆚": "squared_vs",
    "📳": "vibration_mode",
    "📴": "mobile_phone_off",
    "🅰": "negative_squared_latin_capital_letter_a",
    "🅱": "negative_squared_latin_capital_letter_b",
    "🆎": "negative_squared_ab",
    "🅾": "negative_squared_latin_capital_letter_o",
    "💠": "diamond_shape_with_a_dot_inside",
    "➿": "double_curly_loop",
    "♻": "black_universal_recycling_symbol",
    "♈": "aries",
    "♉": "taurus",
    "♊": "gemini",
    "♋": "cancer",
    "♌": "leo",
    "♍": "virgo",
    "♎": "libra",
    "♏": "scorpius",
    "♐": "sagittarius",
    "♑": "capricorn",
    "♒": "aquarius",
    "♓": "pisces",
    "⛎": "ophiuchus",
    "🔯": "six_pointed_star_with_middle_dot",
    "🏧": "automated_teller_machine",
    "💹": "chart_with_upwards_trend_and_yen_sign",
    "💲": "heavy_dollar_sign",
    "💱": "currency_exchange",
    "©": "copyright_sign",
    "®": "registered_sign",
    "™": "trade_mark_sign",
    "❌": "cross_mark",
    "‼": "double_exclamation_mark",
    "⁉": "exclamation_question_mark",
    "❗": "heavy_exclamation_mark_symbol",
    "❓": "black_question_mark_ornament",
    "❕": "white_exclamation_mark_ornament",
    "❔": "white_question_mark_ornament",
    "⭕": "heavy_large_circle",
    "🔝": "top_with_upwards_arrow_above",
    "🔚": "end_with_leftwards_arrow_above",
    "🔙": "back_with_leftwards_arrow_above",
    "🔛": "on_with_exclamation_mark_with_left_right_arrow_above",
    "🔜": "soon_with_rightwards_arrow_above",
    "🔃": "clockwise_downwards_and_upwards_open_circle_arrows",
    "🕛": "clock_face_twelve_oclock",
    "🕧": "clock_face_twelve_thirty",
    "🕐": "clock_face_one_oclock",
    "🕜": "clock_face_one_thirty",
    "🕑": "clock_face_two_oclock",
    "🕝": "clock_face_two_thirty",
    "🕒": "clock_face_three_oclock",
    "🕞": "clock_face_three_thirty",
    "🕓": "clock_face_four_oclock",
    "🕟": "clock_face_four_thirty",
    "🕔": "clock_face_five_oclock",
    "🕠": "clock_face_five_thirty",
    "🕕": "clock_face_six_oclock",
    "🕖": "clock_face_seven_oclock",
    "🕗": "clock_face_eight_oclock",
    "🕘": "clock_face_nine_oclock",
    "🕙": "clock_face_ten_oclock",
    "🕚": "clock_face_eleven_oclock",
    "🕡": "clock_face_six_thirty",
    "🕢": "clock_face_seven_thirty",
    "🕣": "clock_face_eight_thirty",
    "🕤": "clock_face_nine_thirty",
    "🕥": "clock_face_ten_thirty",
    "🕦": "clock_face_eleven_thirty",
    "✖": "heavy_multiplication_x",
    "➕": "heavy_plus_sign",
    "➖": "heavy_minus_sign",
    "➗": "heavy_division_sign",
    "♠": "black_spade_suit",
    "♥": "black_heart_suit",
    "♣": "black_club_suit",
    "♦": "black_diamond_suit",
    "💮": "white_flower",
    "💯": "hundred_points_symbol",
    "✔": "heavy_check_mark",
    "☑": "ballot_box_with_check",
    "🔘": "radio_button",
    "🔗": "link_symbol",
    "➰": "curly_loop",
    "〰": "wavy_dash",
    "〽": "part_alternation_mark",
    "🔱": "trident_emblem",
    "◼": "black_medium_square",
    "◻": "white_medium_square",
    "◾": "black_medium_small_square",
    "◽": "white_medium_small_square",
    "▪": "black_small_square",
    "▫": "white_small_square",
    "🔺": "up_pointing_red_triangle",
    "🔲": "black_square_button",
    "🔳": "white_square_button",
    "⚫": "medium_black_circle",
    "⚪": "medium_white_circle",
    "🔴": "large_red_circle",
    "🔵": "large_blue_circle",
    "🔻": "down_pointing_red_triangle",
    "⬜": "white_large_square",
    "⬛": "black_large_square",
    "🔶": "large_orange_diamond",
    "🔷": "large_blue_diamond",
    "🔸": "small_orange_diamond",
    "🔹": "small_blue_diamond"
  };

}).call(this);
