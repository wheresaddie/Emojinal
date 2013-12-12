var canvas = document.querySelector('canvas');
Graphics = new Processing(canvas);

// Graphics.size(2048/2, 1536 - 100)
Graphics.size(600, 600)
Graphics.background(255);

Graphics.emojinalDraw = function(fn) {
  Graphics.draw = fn
  Graphics.loop()
}

Graphics.signedRandom = function() {
  return Graphics.random(-1, 1);
}

Emojinal.lookupTable["🎨✒"] = "Graphics.line<4"
Emojinal.lookupTable["🎨✏"] = "Graphics.text<3"
Emojinal.lookupTable["🎨⚪"] = "Graphics.ellipse<4"
Emojinal.lookupTable["🎨◻"] = "Graphics.rect<4"
Emojinal.lookupTable["🎨💄"] = "Graphics.fill"
Emojinal.lookupTable["🎨🚿"] = "Graphics.background"
Emojinal.lookupTable["🎨🔄"] = "Graphics.emojinalDraw"

Emojinal.lookupTable["⌚"] = "Graphics.millis"
Emojinal.lookupTable["🎲"] = "Graphics.signedRandom<0"

Emojinal.lookupTable["↔"] = "Graphics.width"
Emojinal.lookupTable["↕"] = "Graphics.height"


Emojinal.suffix += "🎨🚿 2⃣5⃣5⃣"