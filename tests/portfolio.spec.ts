import { test, expect } from "@playwright/test";
test("page renders without errors, missing images, or horizontal overflow", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("./");
  await expect(
    page.getByRole("heading", {
      name: "Security. Connectivity. Power.",
    }),
  ).toBeVisible();
  for (const screenshot of await page.locator("main img").all()) {
    await screenshot.scrollIntoViewIfNeeded();
  }
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.waitForFunction(() =>
    [...document.images].every(
      (image) => image.complete && image.naturalWidth > 0,
    ),
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBeTruthy();
  expect(errors).toEqual([]);
  await expect(page).toHaveTitle("Owuor Timon Odhiambo — Engineering & Installation Services");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: testInfo.outputPath("portfolio.png"), fullPage: true, animations: "disabled" });
  await page.screenshot({ path: testInfo.outputPath("hero.png"), animations: "disabled" });
  await page.locator("#contact").screenshot({ path: testInfo.outputPath("contact.png"), style: ".site-header, .skip-link { visibility: hidden; }" });
});
test("project filters, gallery navigation, and modal keyboard dismissal work", async ({
  page,
}) => {
  await page.goto("./");
  await page.getByRole("button", { name: "Engineering", exact: true }).click();
  await expect(
    page.getByRole("button", {
      name: "View Smart Irrigation Controller project",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "View Inventory Tracker project" }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "All projects" }).click();
  const trigger = page.getByRole("button", {
    name: "View Inventory Tracker project",
  });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("img", { name: /screenshot/ })).toHaveAttribute(
    "src",
    /IT009.png$/,
  );
  await dialog.getByRole("button", { name: "Next screenshot" }).click();
  await expect(dialog.getByRole("img", { name: /screenshot/ })).toHaveAttribute(
    "src",
    /IT008.png$/,
  );
  await dialog.getByRole("button", { name: "Previous screenshot" }).click();
  await expect(dialog.getByRole("img", { name: /screenshot/ })).toHaveAttribute(
    "src",
    /IT009.png$/,
  );
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});
test("engineering services lead and teamwork claims stay project-based", async ({ page }) => {
  await page.goto("./");
  expect(await page.locator("main > section").evaluateAll((sections) => sections.map((section) => section.id))).toEqual([
    "home", "expertise", "process", "work", "about", "contact",
  ]);
  const services = page.locator("#expertise");
  for (const title of ["CCTV & access control", "Networking & telecoms", "Solar installations", "Software & integration"]) {
    await expect(services.getByRole("heading", { name: title, exact: true })).toBeVisible();
  }
  await expect(services).toContainText("typically using client-provided equipment");
  await expect(page.locator("#process")).toContainText("I can recruit collaborators for that project");
  await expect(page.locator("#about")).toContainText("employment opportunities");
  await expect(page.locator("#work")).toContainText("not client installation case studies");
  await expect(page.locator("#journal")).toHaveCount(0);
  await expect(page.getByText("Precision transcription", { exact: true })).toHaveCount(0);
});
test("navigation works at each viewport", async ({ page }, testInfo) => {
  await page.goto("./");
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await expect(page.getByRole("navigation")).toBeVisible();
  }
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "About", exact: true })
    .click();
  await expect(page).toHaveURL(/#about$/);
  if (testInfo.project.name === "mobile")
    await expect(page.getByRole("navigation")).not.toBeVisible();
});
test("contact links use the approved phone, WhatsApp, and email", async ({ page }) => {
  await page.goto("./");
  const contact = page.locator("#contact");
  await expect(contact).toContainText("Based in Nairobi");
  await expect(contact).toContainText("Travel to other accessible locations by arrangement");
  await expect(contact.getByRole("link", { name: /CALL ME/ })).toHaveAttribute("href", "tel:+254107240805");
  await expect(contact.getByRole("link", { name: /EMAIL infotech/ })).toHaveAttribute("href", "mailto:infotechhaven6@gmail.com");
  const whatsapp = new URL((await contact.getByRole("link", { name: /WHATSAPP \+254/ }).getAttribute("href"))!);
  expect(whatsapp.origin + whatsapp.pathname).toBe("https://wa.me/254107240805");
  expect(whatsapp.searchParams.get("text")).toBe("Hi Timon, I’d like to discuss an installation.");
  await expect(page.getByRole("link", { name: "Discuss an installation", exact: true })).toHaveAttribute("href", whatsapp.href);
});

test("service enquiries preselect a service and safely encode a WhatsApp draft", async ({ page }) => {
  await page.goto("./");
  const draftLink = page.getByRole("link", { name: "Continue on WhatsApp" });
  let draft = new URL((await draftLink.getAttribute("href"))!);
  expect(draft.searchParams.get("text")).toContain("Service: Several systems / advice on scope");
  for (const service of ["CCTV & access control", "Networking & telecoms", "Solar installations", "Software & integration"]) {
    await page.getByRole("link", { name: `Enquire about ${service}`, exact: true }).click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(page.getByLabel("What do you need?")).toHaveValue(service);
  }
  await page.getByLabel("What do you need?").selectOption("Networking & telecoms");
  await page.getByLabel("Site location").fill("  Ruiru & Nairobi #2  ");
  await page.getByLabel("A little about the job").fill("  6 data points + Wi-Fi\nClient’s equipment: router & APs.  ");
  draft = new URL((await draftLink.getAttribute("href"))!);
  expect(draft.origin + draft.pathname).toBe("https://wa.me/254107240805");
  expect(draft.hash).toBe("");
  expect([...draft.searchParams.keys()]).toEqual(["text"]);
  expect(draft.searchParams.get("text")).toBe("Hi Timon, I’d like to discuss a project.\nService: Networking & telecoms\nLocation: Ruiru & Nairobi #2\nRequirements: 6 data points + Wi-Fi\nClient’s equipment: router & APs.");
  await expect(page.getByText(/nothing is sent automatically/)).toBeVisible();
  await page.reload();
  await expect(page.getByLabel("Site location")).toHaveValue("");
  await expect(page.getByLabel("A little about the job")).toHaveValue("");
});

test("email can be copied with accessible confirmation", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: async (value: string) => { document.documentElement.dataset.copiedEmail = value; } },
      configurable: true,
    });
  });
  await page.goto("./");
  await page.getByRole("button", { name: "Copy email" }).click();
  await expect(page.getByRole("status")).toHaveText("Email copied");
  await expect(page.locator("html")).toHaveAttribute("data-copied-email", "infotechhaven6@gmail.com");
});

test("mobile menu dismisses with Escape and restores focus", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile navigation only");
  await page.goto("./");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.click();
  await expect(page.getByRole("navigation")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("navigation")).not.toBeVisible();
  await expect(toggle).toBeFocused();
});

test("layouts fit narrow phones, tablets, and desktop screens", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("./");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
    await expect(page.getByRole("link", { name: "Continue on WhatsApp" })).toBeVisible();
  }
});

for (const [legacy, section] of [["projects.html", "work"], ["about.html", "about"], ["contact.html", "contact"], ["Blog.html", "work"], ["#journal", "work"]]) {
  test(`legacy ${legacy} redirects into ${section}`, async ({ page }) => {
    await page.goto(legacy);
    await expect(page).toHaveURL(new RegExp(`#${section}$`));
    await expect(page.locator(`#${section}`)).toBeVisible();
  });
}

test("project gallery prevents background focus and wraps screenshots", async ({ page }) => {
  await page.goto("./");
  const trigger = page.getByRole("button", { name: "View ISP Billing & Management project" });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: "Previous screenshot" }).click();
  await expect(dialog.getByRole("img", { name: /screenshot/ })).toHaveAttribute("src", /ISP003.png$/);
  await dialog.getByRole("button", { name: "Next screenshot" }).click();
  await expect(dialog.getByRole("img", { name: /screenshot/ })).toHaveAttribute("src", /ISP004.png$/);
  for (let tabCount = 0; tabCount < 8; tabCount += 1) {
    await page.keyboard.press("Tab");
    expect(await dialog.evaluate((element) => element.contains(document.activeElement) || !document.hasFocus())).toBeTruthy();
  }
  await trigger.evaluate((element) => element.focus());
  await expect(trigger).not.toBeFocused();
  await dialog.getByRole("button", { name: "Close details" }).click();
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});
