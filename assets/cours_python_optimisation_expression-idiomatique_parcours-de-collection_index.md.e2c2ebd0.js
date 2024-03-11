import{_ as s,o as n,c as e,N as a}from"./chunks/framework.0e180df0.js";const C=JSON.parse('{"title":"Parcours de collection","description":"","frontmatter":{},"headers":[],"relativePath":"cours/python/optimisation/expression-idiomatique/parcours-de-collection/index.md"}'),l={name:"cours/python/optimisation/expression-idiomatique/parcours-de-collection/index.md"},o=a(`<h1 id="parcours-de-collection" tabindex="-1">Parcours de collection <a class="header-anchor" href="#parcours-de-collection" aria-label="Permalink to &quot;Parcours de collection&quot;">​</a></h1><p>Il existe plusieurs manières de <em>parcourir une collection</em> d&#39;éléments, que ce soit une chaine de caractères, une liste, un tuple, un ensemble ou un dictionnaire. Le plus facile consiste à itérer sur les éléments de la collection à l&#39;aide d&#39;une boucle <code>for...in</code>. Il s&#39;agit de la manière de faire la plus <i>« pythonique »</i> et efficace, dans la plupart des cas.</p><p>Néanmoins, dans le cas de séquences, on a parfois besoin d&#39;accéder aux éléments de la séquence en même temps que leur indice. L&#39;exemple suivant calcule le carré de tous les éléments d&#39;une liste reçue en paramètre, à l&#39;aide d&#39;une boucle <code>while</code> et d&#39;une variable <code>i</code> qui parcourt les indices de la séquence, et renvoie une chaine de caractères comme résultat :</p><div class="language-python"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">square_1</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">x</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">    s </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    i </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">while</span><span style="color:#A6ACCD;"> i </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">len</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">x</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">        s </span><span style="color:#89DDFF;">+=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">f</span><span style="color:#C3E88D;">&#39;</span><span style="color:#F78C6C;">{</span><span style="color:#A6ACCD;">i</span><span style="color:#F78C6C;">}</span><span style="color:#C3E88D;">: </span><span style="color:#F78C6C;">{</span><span style="color:#A6ACCD;">x</span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">i</span><span style="color:#89DDFF;">]**</span><span style="color:#F78C6C;">2}</span><span style="color:#A6ACCD;">\\n</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">        i </span><span style="color:#89DDFF;">+=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> s</span><span style="color:#89DDFF;">[:-</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">]</span></span></code></pre></div><p>On peut faire un peu mieux en utilisant une boucle <code>for</code>, ce qui permet d&#39;éviter de gérer la variable <code>i</code> explicitement :</p><div class="language-python"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">square_2</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">x</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">    s </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> i </span><span style="color:#89DDFF;font-style:italic;">in</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">range</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">len</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">x</span><span style="color:#89DDFF;">)):</span></span>
<span class="line"><span style="color:#A6ACCD;">        s </span><span style="color:#89DDFF;">+=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F78C6C;">{}</span><span style="color:#C3E88D;">: </span><span style="color:#F78C6C;">{}</span><span style="color:#A6ACCD;">\\n</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">format</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">i</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> x</span><span style="color:#89DDFF;">[</span><span style="color:#82AAFF;">i</span><span style="color:#89DDFF;">]**</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> s</span><span style="color:#89DDFF;">[:-</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">]</span></span></code></pre></div><p>La seconde fonction est plus rapide que la première. En effet, on passe de 141 ms à 119 ms pour traiter une liste de cent-mille éléments, soit une diminution de temps de 16%. Dans les deux cas, la boucle permet de générer une séquence d&#39;indices <code>i</code> permettant d&#39;obtenir les valeurs des éléments de la liste avec l&#39;expression <code>x[i]</code>.</p><h2 id="fonction-enumerate" tabindex="-1">Fonction enumerate <a class="header-anchor" href="#fonction-enumerate" aria-label="Permalink to &quot;Fonction enumerate&quot;">​</a></h2><p>Lorsque l&#39;on souhaite parcourir les éléments d&#39;une séquence tout en ayant accès à leur indice dans la séquence, on peut utiliser la <em>fonction prédéfinie <code>enumerate</code></em>. Elle renvoie un itérateur de tuples avec l&#39;indice comme premier élément et la valeur associée comme second élément.</p><p>On peut ainsi écrire une troisième version de la fonction de calcul des carrés des éléments d&#39;une liste, en utilisant la fonction <code>enumerate</code> :</p><div class="language-python"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">square_3</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">x</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">    s </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> i</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> e </span><span style="color:#89DDFF;font-style:italic;">in</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">enumerate</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">x</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">        s </span><span style="color:#89DDFF;">+=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">f</span><span style="color:#C3E88D;">&#39;</span><span style="color:#F78C6C;">{</span><span style="color:#A6ACCD;">i</span><span style="color:#F78C6C;">}</span><span style="color:#C3E88D;">: </span><span style="color:#F78C6C;">{</span><span style="color:#A6ACCD;">e</span><span style="color:#89DDFF;">**</span><span style="color:#F78C6C;">2}</span><span style="color:#A6ACCD;">\\n</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> s</span><span style="color:#89DDFF;">[:-</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">]</span></span></code></pre></div><p>Cette troisième fonction est encore plus rapide et réalise le même traitement que précédemment en seulement 109 ms, à savoir une diminution de 23% par rapport à la première fonction.</p><p>On pourrait même aller encore plus loin, avec une quatrième version, en définissant la liste en compréhension et en utilisant la méthode <code>join</code> pour éviter les concaténations :</p><div class="language-python"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">square_4</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">x</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">\\n</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">join</span><span style="color:#89DDFF;">([</span><span style="color:#C792EA;">f</span><span style="color:#C3E88D;">&#39;</span><span style="color:#F78C6C;">{</span><span style="color:#82AAFF;">i</span><span style="color:#F78C6C;">}</span><span style="color:#C3E88D;">: </span><span style="color:#F78C6C;">{</span><span style="color:#82AAFF;">e</span><span style="color:#89DDFF;">**</span><span style="color:#F78C6C;">2}</span><span style="color:#C3E88D;">&#39;</span><span style="color:#82AAFF;"> </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#82AAFF;"> i</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> e </span><span style="color:#89DDFF;font-style:italic;">in</span><span style="color:#82AAFF;"> enumerate</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">x</span><span style="color:#89DDFF;">)])</span></span></code></pre></div><p>Cette dernière version ne prend plus que 95 ms d&#39;exécution, soit une diminution de 33% par rapport à la première version.</p><h2 id="fonction-zip" tabindex="-1">Fonction zip <a class="header-anchor" href="#fonction-zip" aria-label="Permalink to &quot;Fonction zip&quot;">​</a></h2><p>Lorsque l&#39;on souhaite parcourir deux séquences de même longueur, en parallèle, on est vite tenté d&#39;utiliser une boucle <code>while</code> ou <code>for</code> pour obtenir l&#39;indice de parcours de manière explicite. La <em>fonction prédéfinie <code>zip</code></em> renvoie un itérateur de tuples à plusieurs éléments, chacun provenant d&#39;une séquence différente, mais positionné au même indice.</p><p>On peut donc utiliser la fonction <code>zip</code> pour parcourir plusieurs séquences en parallèle. Voici deux fonctions qui permettent de calculer la somme de deux séquences de nombres :</p><div class="language-python"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">vectorsum_1</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">x</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">y</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">x</span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">i</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> y</span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">i</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> i </span><span style="color:#89DDFF;font-style:italic;">in</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">range</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">len</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">x</span><span style="color:#89DDFF;">))]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">vectorsum_2</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">x</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">y</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">a </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> b </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> a</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> b </span><span style="color:#89DDFF;font-style:italic;">in</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">zip</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">x</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> y</span><span style="color:#89DDFF;">)]</span></span></code></pre></div><p>La seconde fonction est beaucoup plus rapide que la première. En effet, on passe de 44 ms à 17 ms pour calculer la somme de deux listes de cent-mille éléments, soit une diminution de temps de 61%.</p>`,20),p=[o];function t(c,r,i,y,D,F){return n(),e("div",null,p)}const u=s(l,[["render",t]]);export{C as __pageData,u as default};
