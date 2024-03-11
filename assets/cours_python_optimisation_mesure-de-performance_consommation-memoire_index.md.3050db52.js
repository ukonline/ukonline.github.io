import{_ as e,o as s,c as a,N as n}from"./chunks/framework.0e180df0.js";const F=JSON.parse('{"title":"Consommation mémoire","description":"","frontmatter":{},"headers":[],"relativePath":"cours/python/optimisation/mesure-de-performance/consommation-memoire/index.md"}'),o={name:"cours/python/optimisation/mesure-de-performance/consommation-memoire/index.md"},l=n(`<h1 id="consommation-memoire" tabindex="-1">Consommation mémoire <a class="header-anchor" href="#consommation-memoire" aria-label="Permalink to &quot;Consommation mémoire&quot;">​</a></h1><p>Un deuxième type d&#39;analyse intéressant à faire est l&#39;évaluation de la <em>consommation de mémoire</em> résultant de l&#39;exécution d&#39;un programme ou d&#39;une partie du programme. Contrairement au temps d&#39;exécution, il n&#39;y a généralement pas d&#39;outils disponibles sur votre système d&#39;exploitation pour mesurer cette consommation de mémoire, du moins précisément.</p><h2 id="pile" tabindex="-1">Pile <a class="header-anchor" href="#pile" aria-label="Permalink to &quot;Pile&quot;">​</a></h2><p>Lors de l&#39;exécution d&#39;un programme, il y a essentiellement deux différentes zones mémoires qui sont utilisées. La <em>pile</em> est utilisée pour stocker les paramètres et variables locales déclarées qui sont utilisées les fonctions. Au plus il y a d&#39;appels de fonction en cours, au plus la pile sera donc mobilisée. Il faut être particulièrement prudent lorsque l&#39;on utilise des <em>fonctions récursives</em>, pour ne pas provoquer un <em>dépassement de capacité</em> de la pile, comme avec le simple exemple suivant :</p><div class="language-python"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">recursive_fct</span><span style="color:#89DDFF;">():</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#82AAFF;">recursive_fct</span><span style="color:#89DDFF;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">recursive_fct</span><span style="color:#89DDFF;">()</span></span></code></pre></div><p>La fonction <code>recursive_fct</code> se rappelle directement elle-même et, chaque appel étant stocké sur la pile en attendant de pouvoir se terminer, cette dernière finit par être pleine, comme en témoigne l&#39;erreur de type <code>RecursionError</code> qui est levée et reprise à la fin du résultat de l&#39;exécution :</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">RecursionError: maximum recursion depth exceeded</span></span></code></pre></div><p>L&#39;espace mémoire utilisé dans la pile augmente donc lorsqu&#39;il y a des appels de fonction et l&#39;espace alloué est immédiatement libéré à chaque retour d&#39;une des fonctions appelées. La difficulté avec les <em>appels récursifs</em> est que des appels s&#39;enchainent et ne se terminent que tous ensemble, lorsqu&#39;il n&#39;y a plus d&#39;appel récursif effectué.</p><h3 id="limite-du-nombre-d-appels-recursifs" tabindex="-1">Limite du nombre d&#39;appels récursifs <a class="header-anchor" href="#limite-du-nombre-d-appels-recursifs" aria-label="Permalink to &quot;Limite du nombre d&#39;appels récursifs&quot;">​</a></h3><p>Pour connaitre le plus grand nombre d&#39;appels récursifs que l&#39;on peut faire, on peut appeler la fonction <code>getrecursionlimit</code> du module <code>sys</code>. La fonction <code>setrecursionlimit</code> du même module permet de modifier cette limite, tant que la valeur choisie reste en dessous de la valeur maximale supportée par le système. Voici l&#39;instruction qui vous permet donc de connaitre cette limite pour votre système :</p><div class="language-python"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">print</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">sys</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getrecursionlimit</span><span style="color:#89DDFF;">())</span></span></code></pre></div><p>Dans notre cas, on ne peut dépasser 1000 appels récursifs :</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">1000</span></span></code></pre></div><h2 id="tas" tabindex="-1">Tas <a class="header-anchor" href="#tas" aria-label="Permalink to &quot;Tas&quot;">​</a></h2><p>L&#39;autre zone mémoire, qui s&#39;appelle le <em>tas</em>, stocke tous les objets qui sont créés durant l&#39;exécution du programme. On l&#39;appelle aussi la <em>mémoire dynamique</em>, car elle se remplit et se vide tout au long de l&#39;exécution, alors que des nouveaux objets sont créés et que ceux qui ne sont plus utilisés sont détruits. Illustrons ceci avec l&#39;exemple suivant :</p><div class="language-python"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">data </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">i </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> i </span><span style="color:#89DDFF;font-style:italic;">in</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">range</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">20</span><span style="color:#89DDFF;">)]</span></span></code></pre></div><p>Dans la pile, de l&#39;espace mémoire est alloué pour stocker le contenu de la variable <code>data</code>, à savoir une référence vers un objet <code>list</code>. L&#39;objet en tant que tel se trouve dans le tas, où notamment 20 zones ont été allouées, chacune stockant l&#39;un des nombres entiers de la liste.</p><p>Le tas possède aussi une capacité maximale qui peut être dépassée si trop d&#39;objets sont créés par le programme. On verra plus loin dans ce chapitre comment obtenir des informations en lien avec l&#39;occupation de cette zone de mémoire, tout au long de l&#39;exécution du programme.</p><h3 id="ramasse-miettes" tabindex="-1">Ramasse-miettes <a class="header-anchor" href="#ramasse-miettes" aria-label="Permalink to &quot;Ramasse-miettes&quot;">​</a></h3><p>Contrairement à la pile, qui se vide automatiquement lorsque les appels de fonction se terminent, le mécanisme de nettoyage du tas est plus complexe. La gestion de cette mémoire est faite par un <em>ramasse-miettes</em>, un composant de la machine virtuelle Python qui va surveiller l&#39;occupation du tas et supprimer les objets qui ne sont plus utilisés.</p><p>Identifier ces objets est une tâche ardue dans la mesure où un même objet peut être référencé par de multiples variables, locales dans plusieurs fonctions, globales ou dans d&#39;autres objets. Le ramasse-miettes est exécuté de manière régulière et supprime du tas tous les objets qui ne sont plus référencés par aucune variable. Il est possible d&#39;explicitement déclencher ce nettoyage en appelant la fonction <code>collect</code> du <em>module <code>gc</code></em>.</p><p>On peut connaitre le nombre de <em>références</em> que possède un objet avec la <em>fonction <code>getrefcount</code></em> du module <code>sys</code>. Voyons cela avec l&#39;exemple suivant basé sur des objets de type <code>list</code> :</p><div class="language-python"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">data </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">i </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> i </span><span style="color:#89DDFF;font-style:italic;">in</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">range</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">20</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#82AAFF;">print</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">sys</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getrefcount</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">data</span><span style="color:#89DDFF;">))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">backup </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#82AAFF;">print</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">sys</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getrefcount</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">data</span><span style="color:#89DDFF;">))</span></span></code></pre></div><p>La première instruction crée une nouvelle liste et stocke une référence vers celle-ci dans la variable <code>data</code>, ce qui donne donc une référence vers l&#39;objet. Comme une référence temporaire est créée à l&#39;intérieur de la fonction <code>getrefcount</code>, le résultat renvoyé sera donc 1 ou 2, en fonction du timing de mise à jour du nombre de références.</p><p>On stocke ensuite une référence vers l&#39;objet dans une nouvelle liste, elle-même référencée par la variable <code>backup</code>, ce qui fait que la première liste a maintenant deux références vers elle. De nouveau, pour la même raison qu&#39;expliquée plus haut, le résultat renvoyé par la fonction <code>getrefcount</code> sera donc 2 ou 3. Voici le résultat obtenu dans notre cas, où on voit bien une différence d&#39;une référence entre les deux affichages :</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">2</span></span>
<span class="line"><span style="color:#A6ACCD;">3</span></span></code></pre></div><h2 id="espace-memoire-occupe" tabindex="-1">Espace mémoire occupé <a class="header-anchor" href="#espace-memoire-occupe" aria-label="Permalink to &quot;Espace mémoire occupé&quot;">​</a></h2><p>Voyons maintenant comment obtenir plus d&#39;information en lien avec la consommation mémoire due aux objets qui sont créés dans le tas.</p><h3 id="bloc-alloue" tabindex="-1">Bloc alloué <a class="header-anchor" href="#bloc-alloue" aria-label="Permalink to &quot;Bloc alloué&quot;">​</a></h3><p>Une première solution consiste à utiliser la <em>fonction <code>getallocatedblocks</code></em> du module <code>sys</code>. Cette dernière renvoie le nombre de blocs mémoire qui a été alloué pour le programme, peu importe les tailles de ces blocs, dans le tas. Voyons comment l&#39;utiliser avec l&#39;exemple suivant :</p><div class="language-python"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki material-theme-palenight has-diff"><code><span class="line"><span style="color:#A6ACCD;">gc</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">collect</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">before </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> sys</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getallocatedblocks</span><span style="color:#89DDFF;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">data </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">i </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> i </span><span style="color:#89DDFF;font-style:italic;">in</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">range</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">20</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">diff </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> sys</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getallocatedblocks</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> before</span></span>
<span class="line"><span style="color:#82AAFF;">print</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">f</span><span style="color:#C3E88D;">&#39;</span><span style="color:#F78C6C;">{</span><span style="color:#82AAFF;">diff</span><span style="color:#F78C6C;">}</span><span style="color:#C3E88D;"> blocs supplémentaires alloués&#39;</span><span style="color:#89DDFF;">)</span></span></code></pre></div><p>On commence par explicitement supprimer les objets non référencés du tas, puis on examine combien de blocs sont actuellement alloués. On crée ensuite de nouveau une liste de 20 éléments, ce qui va provoquer des allocations mémoire pour en stocker le contenu. On redemande ensuite le nombre de blocs alloués pour afficher la différence :</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">5 blocs supplémentaires alloués</span></span></code></pre></div><p>Ce résultat pourrait paraitre surprenant dans la mesure où 20 nouveaux objets de type <code>int</code> devraient avoir été créés, à savoir les éléments de la liste. Néanmoins, la plupart des valeurs comprises entre 0 et 20 (exclue) ont certainement déjà été créées par le code d&#39;initialisation de la machine virtuelle Python et n&#39;ont donc pas été recréées. Si vous faites le test avec un autre intervalle de nombres entiers, ou en créant une liste de chaines de caractères, vous obtiendrez d&#39;autres résultats.</p><h3 id="taille-d-un-objet" tabindex="-1">Taille d&#39;un objet <a class="header-anchor" href="#taille-d-un-objet" aria-label="Permalink to &quot;Taille d&#39;un objet&quot;">​</a></h3><p>Une autre possibilité pour connaitre la mémoire allouée, plus précise que la précédente, mais également plus complexe à mettre en œuvre, consiste à utiliser la <em>fonction <code>getsizeof</code></em> du module <code>sys</code>. Cette fonction permet d&#39;obtenir le <em>nombre d&#39;octets occupé par un objet</em>, mais en ne prenant en compte que la consommation directement attribuable à ce dernier, et pas celle des objets dont il stockerait une référence. Partons d&#39;un programme qui crée deux tuples, le premier contenant 20 nombres entiers et le second contenant 20 chaines de caractères :</p><div class="language-python"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">data </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">i </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> i </span><span style="color:#89DDFF;font-style:italic;">in</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">range</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">20</span><span style="color:#89DDFF;">))</span></span>
<span class="line"><span style="color:#82AAFF;">print</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">sys</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getsizeof</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">data</span><span style="color:#89DDFF;">))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">content </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">str</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">i</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> i </span><span style="color:#89DDFF;font-style:italic;">in</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">range</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">20</span><span style="color:#89DDFF;">))</span></span>
<span class="line"><span style="color:#82AAFF;">print</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">sys</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getsizeof</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">content</span><span style="color:#89DDFF;">))</span></span></code></pre></div><p>Il ne faut pas être un expert en Python pour se douter que ces deux objets occupent chacun un espace mémoire différent, contrairement au résultat obtenu qui indique 112 octets pour les deux objets :</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">112</span></span>
<span class="line"><span style="color:#A6ACCD;">112</span></span></code></pre></div><p>La raison est simplement que les 112 octets indiqués correspondent à l&#39;espace occupé par un objet de type <code>tuple</code>, sans prendre en compte son contenu. Pour avoir une idée plus précise de l&#39;espace mémoire total occupé, il faut aussi comptabiliser la mémoire occupée par les éléments contenus dans le tuple. L&#39;exemple suivant réalise ce calcul :</p><div class="language-python"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">tuple_size</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">t</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">    size </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> sys</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getsizeof</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">t</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> e </span><span style="color:#89DDFF;font-style:italic;">in</span><span style="color:#A6ACCD;"> t</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">        size </span><span style="color:#89DDFF;">+=</span><span style="color:#A6ACCD;"> sys</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getsizeof</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">e</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> size</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">data </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">i </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> i </span><span style="color:#89DDFF;font-style:italic;">in</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">range</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">20</span><span style="color:#89DDFF;">))</span></span>
<span class="line"><span style="color:#82AAFF;">print</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">tuple_size</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">data</span><span style="color:#89DDFF;">))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">content </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">str</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">i</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> i </span><span style="color:#89DDFF;font-style:italic;">in</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">range</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">20</span><span style="color:#89DDFF;">))</span></span>
<span class="line"><span style="color:#82AAFF;">print</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">tuple_size</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">content</span><span style="color:#89DDFF;">))</span></span></code></pre></div><p>Cette fois-ci, le résultat montre bien que le tuple de chaines de caractères occupe plus de place en mémoire que celui de nombres entiers :</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">668</span></span>
<span class="line"><span style="color:#A6ACCD;">1122</span></span></code></pre></div><p>Évidemment, si c&#39;est très simple de calculer l&#39;espace mémoire total occupé par un simple tuple, comme dans les exemples que l&#39;on vient de voir, cela peut s&#39;avérer bien plus complexe dans d&#39;autres cas. En effet, si le tuple contient des objets plus complexes, il faudra aussi calculer l&#39;espace précis que ces derniers occupent. En toute généralité, on ne pourra donc pas se baser sur la fonction <code>getsizeof</code> pour connaitre l&#39;espace mémoire total occupé par un objet, peu importe son type.</p>`,44),t=[l];function p(c,r,i,u,d,m){return s(),a("div",null,t)}const D=e(o,[["render",p]]);export{F as __pageData,D as default};
