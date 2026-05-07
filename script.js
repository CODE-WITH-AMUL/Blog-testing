// ---- GLOBAL SMOOTH SCROLL (enhanced feel)
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ---- DARK / BRIGHT MODE (toggle with localStorage & dynamic class on body)
function initTheme() {
    const savedTheme = localStorage.getItem('Code With Amul_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (savedTheme === null && prefersDark);
    if (isDark) {
        document.body.classList.add('dark-mode');
        document.getElementById('themeIcon')?.classList.remove('fa-moon', 'fa-regular');
        document.getElementById('themeIcon')?.classList.add('fa-sun', 'fa-regular');
    } else {
        document.body.classList.remove('dark-mode');
        const icon = document.getElementById('themeIcon');
        if (icon) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

function toggleDarkMode() {
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('Code With Amul_theme', 'light');
        const icon = document.getElementById('themeIcon');
        if (icon) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    } else {
        document.body.classList.add('dark-mode');
        localStorage.setItem('Code With Amul_theme', 'dark');
        const icon = document.getElementById('themeIcon');
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
}

// ---- ARTICLE MODAL & ROUTING
const articlesData = {
    1: {
        title: "Advanced TypeScript Patterns Used at Scale",
        content: `<p class="mb-4 text-xl font-medium">TypeScript's type system is a powerhouse — especially when building large-scale applications. At Code With Amul, we rely on <strong class="text-black dark:text-white">conditional types, template literal types, and mapped type modifiers</strong> to craft robust APIs.</p>
        <h2 class="text-2xl font-semibold mt-6 mb-3">Conditional types & infer</h2>
        <p>Using <code class="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">infer</code> within conditional types unlocks incredible flexibility. For example, extracting return types or deep nested properties becomes a breeze. In production, we built a type-safe event bus that reduced runtime errors by 42%.</p>
        <pre class="bg-gray-950 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm my-5"><code>type ExtractReturnType&lt;T&gt; = T extends (...args: any[]) =&gt; infer R ? R : never;</code></pre>
        <p>We also implement brand nominal typing to distinguish between different IDs, and leverage <strong>recursive types</strong> for nested validation schemas. These patterns scaled across 150+ components without friction.</p>
        <p class="mt-4">✨ The result: cleaner codebase and more maintainability across teams.</p>`
    },
    2: {
        title: "How We Reduced Bundle Size by 68%",
        content: `<p class="mb-4 text-xl font-medium">Performance matters. Our main dashboard used to weigh ~2.1MB (gzipped). After systematic analysis and applying <strong>code splitting, tree shaking, and dynamic imports</strong>, we landed at ~670KB — a <span class="font-bold text-green-600">68% reduction</span>.</p>
        <h2 class="text-2xl font-semibold mt-6 mb-3">Key strategies</h2>
        <ul class="list-disc pl-6 space-y-2 my-4">
            <li>Route-based chunk splitting with React.lazy()</li>
            <li>Removing unused third-party libraries via bundle analysis (Webpack Bundle Analyzer)</li>
            <li>Transforming SVG icons into React components to avoid icon font bloat</li>
            <li>Optimizing image formats to WebP and implementing lazy loading</li>
        </ul>
        <p>We also migrated some utility functions to native browser APIs (e.g., replace lodash get with optional chaining). Lighthouse score jumped from 68 to 96. The improved UX leads to higher engagement.</p>
        <p> Full case study includes CI size regression tests to keep bundle lean over time.</p>`
    },
    3: {
        title: "Building Production RAG Systems",
        content: `<p class="mb-4 text-xl font-medium">Retrieval-Augmented Generation (RAG) is redefining AI apps. This article dives into how we built a <strong>document Q&A pipeline</strong> serving thousands of queries daily with high accuracy.</p>
        <h2 class="text-2xl font-semibold mt-6 mb-3">Vector search & embedding pipeline</h2>
        <p>We use OpenAI embeddings with pgvector for similarity search. Chunking strategy (overlap + semantic splitting) improved retrieval relevance by 31% compared to naive chunking. Additionally, we implemented a reranking step using cross-encoders.</p>
        <pre class="bg-gray-950 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm my-5"><code># Pseudo: retrieval + prompt injection
context = vector_store.query(embed_query(query), top_k=5)
response = llm.generate(prompt_template.format(context=context, question=query))</code></pre>
        <p>Evaluation frameworks (ROUGE, faithfulness) helped us iterate. The final system reduced hallucination and provides citations. We also added guardrails to prevent harmful generation.</p>
        <p>🔮 This blueprint can be applied to any codebase or knowledge base. Stay tuned for the next part about streaming responses.</p>`
    }
};

function openFullArticle(id) {
    // Route to blog.html with article ID
    window.location.href = `blog.html?id=${id}`;
}

function readPost(id) {
    window.location.href = `blog.html?id=${id}`;
}

// ---- SEARCH & SUBSCRIBE
function toggleSearch() {
    alert("🔍 Search index is being built — soon you'll find every article with blazing speed.");
}

function subscribeClick() {
    const emailInput = document.getElementById('email-input');
    if (!emailInput) return;
    
    const email = emailInput.value.trim();
    if (email && email.includes('@') && email.includes('.')) {
        alert(` Subscribed! ${email} will receive weekly insights.`);
        emailInput.value = '';
    } else {
        alert("📧 Please enter a valid email address to subscribe.");
    }
}

// ---- FULL ARTICLE EXPERIENCE (modal reading with rich content, replaces old alert)
function closeArticleModal() {
    const modal = document.getElementById('articleModal');
    const innerModal = document.getElementById('modalContentInner');
    if (!innerModal) return;
    
    innerModal.classList.add('scale-95', 'opacity-0');
    innerModal.classList.remove('scale-100', 'opacity-100');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }, 250);
}

// close modal on backdrop click
document.getElementById('articleModal')?.addEventListener('click', function(e) {
    if(e.target === this) closeArticleModal();
});

// ---- SCROLL REVEAL ANIMATIONS
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-elm');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -20px 0px" });
    
    revealElements.forEach(el => observer.observe(el));
}

// Initialize all features
window.addEventListener('load', () => {
    initTheme();
    initScrollReveal();
});

// Dark mode toggle listener
window.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
});
