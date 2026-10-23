import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import {
  COLORING_PICTURES,
  KAWAII_COLOR_PALETTE,
} from "../src/data/coloringPictures.ts";

test("COLORING_PICTURES has 21 new pictures (Sanrio, Capybara, Garden, Solo) and all asset files exist on disk", () => {
  assert.equal(COLORING_PICTURES.length, 21);
  assert.equal(KAWAII_COLOR_PALETTE.length, 20);

  const publicDir = path.resolve(process.cwd(), "public");
  for (const pic of COLORING_PICTURES) {
    const linePath = path.join(publicDir, pic.url.replace(/^\//, ""));
    assert.ok(fs.existsSync(linePath), `Missing coloring line art: ${linePath}`);

    if (pic.refUrl) {
      const refPath = path.join(publicDir, pic.refUrl.replace(/^\//, ""));
      assert.ok(fs.existsSync(refPath), `Missing coloring reference art: ${refPath}`);
    }
    assert.ok(pic.suggestedHexes.length >= 4, `Picture ${pic.id} should have suggested colors`);
  }
});
