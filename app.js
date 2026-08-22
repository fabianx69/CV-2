"use strict";

(() => {
    const translations = window.CV_TRANSLATIONS;

    if (!translations) {
        throw new Error("No se pudo cargar el archivo de traducciones.");
    }

    const byId = (id) => document.getElementById(id);
    const replaceContents = (element) => element.replaceChildren();

    function renderSkills(items) {
        const container = byId("val-skills");
        replaceContents(container);

        items.forEach(({ cat, val }) => {
            const block = document.createElement("article");
            const category = document.createElement("h3");
            const description = document.createElement("p");

            block.className = "skill-block";
            category.className = "skill-category";
            description.className = "skill-text";
            category.textContent = cat;
            description.textContent = val;

            block.append(category, description);
            container.append(block);
        });
    }

    function renderProjects(items) {
        const container = byId("val-projs");
        replaceContents(container);

        items.forEach(({ t: title, d: description }) => {
            const project = document.createElement("article");
            const heading = document.createElement("h3");
            const body = document.createElement("p");

            project.className = "project";
            heading.className = "project-title";
            body.className = "project-description";
            heading.textContent = title;
            body.textContent = description;

            project.append(heading, body);
            container.append(project);
        });
    }

    function renderLanguages(items) {
        const container = byId("val-langs");
        replaceContents(container);

        items.forEach(({ name, level }) => {
            const card = document.createElement("article");
            const language = document.createElement("h3");
            const proficiency = document.createElement("p");

            card.className = "language-card";
            language.className = "language-name";
            proficiency.className = "language-level";
            language.textContent = name;
            proficiency.textContent = level;

            card.append(language, proficiency);
            container.append(card);
        });
    }

    function renderCertifications(items) {
        const container = byId("val-certs");
        replaceContents(container);

        items.forEach(({ emisor, lista }) => {
            const group = document.createElement("section");
            const heading = document.createElement("h3");
            const badges = document.createElement("div");

            group.className = "cert-group";
            heading.className = "cert-group-title";
            badges.className = "cert-badges";
            heading.textContent = emisor;

            lista.forEach((certificate) => {
                const badge = document.createElement("span");
                badge.className = "cert-badge";
                badge.textContent = certificate;
                badges.append(badge);
            });

            group.append(heading, badges);
            container.append(group);
        });
    }

    function updateLanguageButtons(activeLanguage) {
        document.querySelectorAll(".lang-button").forEach((button) => {
            const isActive = button.dataset.lang === activeLanguage;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });
    }

    function applyTranslation(language, data) {
        document.documentElement.lang = language;
        document.title = `Fabián Urrutia | ${data.title}`;

        byId("title-tag").textContent = data.title;
        byId("lbl-profile").textContent = data.profile;
        byId("val-profile").textContent = data.profileDesc;
        byId("lbl-exp").textContent = data.exp;
        byId("val-exp").innerHTML = data.expData;
        byId("lbl-skills").textContent = data.skills;
        byId("lbl-projs").textContent = data.projs;
        byId("lbl-edu").textContent = data.edu;
        byId("val-edu").innerHTML = data.eduData;
        byId("lbl-langs").textContent = data.langs;
        byId("lbl-certs").textContent = data.certs;
        byId("lbl-certs-link").textContent = data.certsLink;

        renderSkills(data.skillsData);
        renderProjects(data.projsData);
        renderLanguages(data.langsData);
        renderCertifications(data.certsData);
        updateLanguageButtons(language);
    }

    function setLanguage(requestedLanguage) {
        const language = Object.prototype.hasOwnProperty.call(translations, requestedLanguage)
            ? requestedLanguage
            : "es";
        const resume = byId("main-container");

        resume.classList.add("is-switching");

        window.setTimeout(() => {
            applyTranslation(language, translations[language]);
            resume.classList.remove("is-switching");
        }, 120);
    }

    document.querySelectorAll(".lang-button").forEach((button) => {
        button.addEventListener("click", () => setLanguage(button.dataset.lang));
    });

    setLanguage("es");
})();
