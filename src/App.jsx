import React, { useState, useEffect } from 'react';
import { 
  Terminal, Folder, Shield, Activity, Search, 
  Package, Globe, Users, Settings, Cpu, AlertTriangle, 
  Lightbulb, Copy, Check, Menu, X, FileText, Server, 
  ChevronRight, ChevronDown, Key, HelpCircle
} from 'lucide-react';

import { FaLinux } from "react-icons/fa";

// --- COMPOSANTS DE BASE ---

const CodeBlock = ({ code, language = "bash" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-md overflow-hidden my-4 border border-slate-700 bg-slate-900 shadow-lg">
      <div className="flex items-center justify-between px-4 py-1.5 bg-slate-800 border-b border-slate-700 text-xs text-slate-400">
        <span>{language}</span>
        <button 
          onClick={handleCopy} 
          className="hover:text-slate-200 transition-colors flex items-center gap-1 p-1 rounded hover:bg-slate-700"
          title="Copier le code"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          {copied ? "Copié !" : "Copier"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono text-emerald-400">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const DangerAlert = ({ children }) => (
  <div className="bg-red-950/40 border border-red-900 rounded-lg p-4 my-4 flex items-start gap-3">
    <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={20} />
    <div className="text-red-200 text-sm leading-relaxed">{children}</div>
  </div>
);

const ProTip = ({ children }) => (
  <div className="bg-amber-950/30 border border-amber-900/50 rounded-lg p-4 my-4 flex items-start gap-3">
    <Lightbulb className="text-amber-500 shrink-0 mt-0.5" size={20} />
    <div className="text-amber-200 text-sm leading-relaxed">
      <span className="font-bold text-amber-500 block mb-1">Pro-Tip:</span>
      {children}
    </div>
  </div>
);

// --- SECTIONS DU COURS ---

const Fundamentals = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-emerald-400 border-b border-slate-800 pb-2">Fondamentaux Linux</h2>
    
    <div className="prose prose-invert max-w-none text-slate-300">
      <p>Linux n'est techniquement pas un système d'exploitation complet, mais un <strong>Kernel (Noyau)</strong>. C'est le chef d'orchestre qui fait le lien entre le matériel (CPU, RAM) et les logiciels.</p>
      
      <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 mt-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Cpu size={20} className="text-emerald-500"/> L'Anatomie du Système</h3>
        <ul className="space-y-3">
          <li><strong className="text-emerald-300">Applications:</strong> Navigateurs, bases de données, terminaux.</li>
          <li><strong className="text-emerald-300">Shell (Bash/Zsh):</strong> L'interface qui interprète vos commandes.</li>
          <li><strong className="text-emerald-300">Kernel Linux:</strong> Gère la mémoire, les processus, le matériel.</li>
          <li><strong className="text-emerald-300">Hardware:</strong> Votre machine physique.</li>
        </ul>
      </div>

      <h3 className="text-xl font-bold text-white mt-8 mb-4">Les Distributions (Distros)</h3>
      <p>Une "distribution" ajoute des logiciels, un shell, et des utilitaires autour du noyau Linux.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-4 border border-slate-800 rounded bg-slate-900/50">
          <h4 className="font-bold text-blue-400">Debian / Ubuntu</h4>
          <p className="text-sm mt-2">Très stables, documentation massive. Le standard pour les serveurs web (Apt package manager).</p>
        </div>
        <div className="p-4 border border-slate-800 rounded bg-slate-900/50">
          <h4 className="font-bold text-red-400">Red Hat / CentOS / Rocky</h4>
          <p className="text-sm mt-2">Orientées Entreprise. Support très long terme. Utilisent RPM/Yum/Dnf.</p>
        </div>
        <div className="p-4 border border-slate-800 rounded bg-slate-900/50">
          <h4 className="font-bold text-cyan-400">Arch Linux</h4>
          <p className="text-sm mt-2">Rolling release. Pour les power-users qui veulent tout construire de zéro.</p>
        </div>
      </div>
    </div>
  </div>
);

const Navigation = ({ vars }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-emerald-400 border-b border-slate-800 pb-2">Navigation & Fichiers</h2>
    <p className="text-slate-300">Tout dans Linux est un fichier. La navigation en ligne de commande est la première compétence à maîtriser.</p>
    
    <div className="grid gap-6 mt-4">
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Se repérer et lister</h3>
        <CodeBlock code={`# Afficher le dossier actuel (Print Working Directory)\npwd\n\n# Lister les fichiers (avec détails et fichiers cachés)\nls -la`} />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Se déplacer</h3>
        <CodeBlock code={`# Aller dans un dossier\ncd /var/log\n\n# Revenir au dossier précédent\ncd -\n\n# Revenir au dossier parent\ncd ..\n\n# Aller dans son dossier personnel (~)\ncd ~`} />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Manipuler les fichiers</h3>
        <CodeBlock code={`# Créer un dossier\nmkdir logs_app\n\n# Créer un fichier vide\ntouch ${vars.filename}\n\n# Copier un fichier\ncp ${vars.filename} ${vars.filename}.bak\n\n# Déplacer ou Renommer\nmv ${vars.filename}.bak backup_${vars.filename}`} />
      </div>

      <DangerAlert>
        Attention avec la commande de suppression <code>rm</code>. Elle est définitive (pas de corbeille par défaut).
        <br/><br/>
        <code>rm -rf /</code> : Efface l'intégralité de votre système silencieusement. NE TAPEZ JAMAIS CELA.
        <br/>
        (r = récursif, f = force)
      </DangerAlert>

      <ProTip>
        Appuyez sur la touche <code>TAB</code> pour autocompléter le nom d'un fichier ou d'un dossier. Si rien ne se passe, appuyez deux fois rapidement pour voir les options disponibles.
      </ProTip>
    </div>
  </div>
);

const FileSystemTree = () => {
  const [expanded, setExpanded] = useState({ root: true, var: true, etc: true });

  const toggle = (folder) => setExpanded(prev => ({ ...prev, [folder]: !prev[folder] }));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-emerald-400 border-b border-slate-800 pb-2">Système de Fichiers (FHS)</h2>
      <p className="text-slate-300">Le "Filesystem Hierarchy Standard" définit l'arborescence de Linux. Il n'y a pas de "C:" ou "D:" sous Linux. Tout part de la racine <code>/</code>.</p>
      
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 font-mono text-sm">
        {/* / */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => toggle('root')}>
          {expanded.root ? <ChevronDown size={16} className="text-slate-400"/> : <ChevronRight size={16} className="text-slate-400"/>}
          <Folder size={18} className="text-blue-400 fill-blue-400/20" />
          <span className="text-emerald-400 font-bold">/ (Root)</span>
        </div>
        
        {expanded.root && (
          <div className="ml-5 pl-2 border-l border-slate-700 space-y-2 mt-2">
            {/* /bin */}
            <div className="flex items-center gap-2 relative group">
              <div className="absolute -left-2 w-2 border-b border-slate-700 top-1/2"></div>
              <Folder size={16} className="text-blue-400" />
              <span className="text-white">bin/</span>
              <span className="text-slate-500 ml-4 hidden group-hover:inline">Binaires (commandes de base comme ls, cp)</span>
            </div>
            
            {/* /etc */}
            <div className="flex items-center gap-2 relative group">
              <div className="absolute -left-2 w-2 border-b border-slate-700 top-1/2"></div>
              <Folder size={16} className="text-blue-400" />
              <span className="text-white">etc/</span>
              <span className="text-slate-500 ml-4 hidden md:inline group-hover:inline">Fichiers de configuration globaux du système</span>
            </div>

            {/* /home */}
            <div className="flex items-center gap-2 relative group">
              <div className="absolute -left-2 w-2 border-b border-slate-700 top-1/2"></div>
              <Folder size={16} className="text-blue-400" />
              <span className="text-white">home/</span>
              <span className="text-slate-500 ml-4 hidden md:inline group-hover:inline">Dossiers personnels des utilisateurs</span>
            </div>

            {/* /root */}
            <div className="flex items-center gap-2 relative group">
              <div className="absolute -left-2 w-2 border-b border-slate-700 top-1/2"></div>
              <Shield size={16} className="text-red-400" />
              <span className="text-red-300 font-bold">root/</span>
              <span className="text-slate-500 ml-4 hidden md:inline group-hover:inline">Dossier personnel du super-administrateur</span>
            </div>

            {/* /var */}
            <div className="flex items-center gap-2 relative cursor-pointer group" onClick={() => toggle('var')}>
              <div className="absolute -left-2 w-2 border-b border-slate-700 top-1/2"></div>
              {expanded.var ? <ChevronDown size={14} className="text-slate-500 -ml-1"/> : <ChevronRight size={14} className="text-slate-500 -ml-1"/>}
              <Folder size={16} className="text-amber-400" />
              <span className="text-white">var/</span>
              <span className="text-slate-500 ml-4 hidden md:inline group-hover:inline">Données variables (logs, bases de données)</span>
            </div>

            {expanded.var && (
              <div className="ml-5 pl-2 border-l border-slate-700 space-y-2 mt-2">
                <div className="flex items-center gap-2 relative group">
                  <div className="absolute -left-2 w-2 border-b border-slate-700 top-1/2"></div>
                  <Folder size={16} className="text-blue-400" />
                  <span className="text-slate-300">log/</span>
                  <span className="text-slate-500 ml-4 hidden group-hover:inline">Journaux système</span>
                </div>
                <div className="flex items-center gap-2 relative group">
                  <div className="absolute -left-2 w-2 border-b border-slate-700 top-1/2"></div>
                  <Folder size={16} className="text-blue-400" />
                  <span className="text-slate-300">www/</span>
                  <span className="text-slate-500 ml-4 hidden group-hover:inline">Sites web (Apache/Nginx par défaut)</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <ProTip>
        Si vous cherchez un fichier de configuration, commencez toujours par chercher dans <code>/etc</code>. Si vous cherchez des logs pour comprendre pourquoi une application plante, allez dans <code>/var/log</code>.
      </ProTip>
    </div>
  );
};

const PermissionsCalculator = ({ vars }) => {
  const [perms, setPerms] = useState({
    owner: { r: true, w: true, x: true },
    group: { r: true, w: false, x: true },
    public: { r: true, w: false, x: true }
  });

  const togglePerm = (entity, type) => {
    setPerms(prev => ({
      ...prev,
      [entity]: {
        ...prev[entity],
        [type]: !prev[entity][type]
      }
    }));
  };

  const getOctal = (entityPerms) => {
    let val = 0;
    if (entityPerms.r) val += 4;
    if (entityPerms.w) val += 2;
    if (entityPerms.x) val += 1;
    return val;
  };

  const octalStr = `${getOctal(perms.owner)}${getOctal(perms.group)}${getOctal(perms.public)}`;
  
  const getSymbolic = (entityPerms) => {
    return `${entityPerms.r ? 'r' : '-'}${entityPerms.w ? 'w' : '-'}${entityPerms.x ? 'x' : '-'}`;
  };
  const symStr = `-${getSymbolic(perms.owner)}${getSymbolic(perms.group)}${getSymbolic(perms.public)}`;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-emerald-400 border-b border-slate-800 pb-2">Permissions : Le Cœur de la Sécurité</h2>
      <p className="text-slate-300">Linux contrôle l'accès via trois entités : Propriétaire (Owner), Groupe (Group), et les Autres (Public). Chaque entité a des droits de Lecture (4), Écriture (2) et Exécution (1).</p>
      
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Key size={20} className="text-emerald-400"/> Calculateur Chmod Interactif
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Owner */}
          <div className="space-y-3">
            <h4 className="text-center font-bold text-amber-400 border-b border-slate-700 pb-2">Owner (Propriétaire)</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-slate-800 rounded">
                <input type="checkbox" checked={perms.owner.r} onChange={() => togglePerm('owner', 'r')} className="w-5 h-5 accent-emerald-500" />
                <span className="text-slate-300">Read (4) - <span className="text-emerald-400 font-mono text-xs">r</span></span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-slate-800 rounded">
                <input type="checkbox" checked={perms.owner.w} onChange={() => togglePerm('owner', 'w')} className="w-5 h-5 accent-emerald-500" />
                <span className="text-slate-300">Write (2) - <span className="text-emerald-400 font-mono text-xs">w</span></span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-slate-800 rounded">
                <input type="checkbox" checked={perms.owner.x} onChange={() => togglePerm('owner', 'x')} className="w-5 h-5 accent-emerald-500" />
                <span className="text-slate-300">Execute (1) - <span className="text-emerald-400 font-mono text-xs">x</span></span>
              </label>
            </div>
          </div>

          {/* Group */}
          <div className="space-y-3">
            <h4 className="text-center font-bold text-amber-400 border-b border-slate-700 pb-2">Group (Groupe)</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-slate-800 rounded">
                <input type="checkbox" checked={perms.group.r} onChange={() => togglePerm('group', 'r')} className="w-5 h-5 accent-emerald-500" />
                <span className="text-slate-300">Read (4) - <span className="text-emerald-400 font-mono text-xs">r</span></span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-slate-800 rounded">
                <input type="checkbox" checked={perms.group.w} onChange={() => togglePerm('group', 'w')} className="w-5 h-5 accent-emerald-500" />
                <span className="text-slate-300">Write (2) - <span className="text-emerald-400 font-mono text-xs">w</span></span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-slate-800 rounded">
                <input type="checkbox" checked={perms.group.x} onChange={() => togglePerm('group', 'x')} className="w-5 h-5 accent-emerald-500" />
                <span className="text-slate-300">Execute (1) - <span className="text-emerald-400 font-mono text-xs">x</span></span>
              </label>
            </div>
          </div>

          {/* Public */}
          <div className="space-y-3">
            <h4 className="text-center font-bold text-amber-400 border-b border-slate-700 pb-2">Public (Autres)</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-slate-800 rounded">
                <input type="checkbox" checked={perms.public.r} onChange={() => togglePerm('public', 'r')} className="w-5 h-5 accent-emerald-500" />
                <span className="text-slate-300">Read (4) - <span className="text-emerald-400 font-mono text-xs">r</span></span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-slate-800 rounded">
                <input type="checkbox" checked={perms.public.w} onChange={() => togglePerm('public', 'w')} className="w-5 h-5 accent-emerald-500" />
                <span className="text-slate-300">Write (2) - <span className="text-emerald-400 font-mono text-xs">w</span></span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-slate-800 rounded">
                <input type="checkbox" checked={perms.public.x} onChange={() => togglePerm('public', 'x')} className="w-5 h-5 accent-emerald-500" />
                <span className="text-slate-300">Execute (1) - <span className="text-emerald-400 font-mono text-xs">x</span></span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-slate-950 rounded-lg border border-slate-700 text-center">
          <p className="text-slate-400 text-sm mb-2">Commande générée</p>
          <div className="font-mono text-2xl text-emerald-400 flex items-center justify-center gap-4">
            <span>chmod {octalStr} {vars.filename}</span>
          </div>
          <p className="text-slate-500 text-xs mt-2 font-mono">Notation `ls -l` : {symStr}</p>
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mt-8">Changer de propriétaire (chown)</h3>
      <CodeBlock code={`# Attribuer le fichier à un autre utilisateur\nsudo chown ${vars.user} ${vars.filename}\n\n# Changer l'utilisateur ET le groupe d'un dossier récursivement (-R)\nsudo chown -R ${vars.user}:www-data /var/www/html`} />
    </div>
  );
};

const Processes = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-emerald-400 border-b border-slate-800 pb-2">Gestion des Processus & Ressources</h2>
    <p className="text-slate-300">Surveiller ce qui tourne et consomme de la mémoire est le pain quotidien du sysadmin.</p>

    <div>
      <h3 className="text-lg font-semibold text-white mb-2">Monitorer en temps réel</h3>
      <CodeBlock code={`# Le gestionnaire de tâches natif (q pour quitter)\ntop\n\n# Version améliorée (souvent à installer : apt install htop)\nhtop`} />
    </div>

    <div>
      <h3 className="text-lg font-semibold text-white mb-2">Lister et Tuer des processus</h3>
      <CodeBlock code={`# Lister TOUS les processus tournant sur la machine\nps aux\n\n# Trouver un processus spécifique (ex: nginx)\nps aux | grep nginx\n\n# Tuer un processus doucement (demande de s'arrêter)\nkill 1234  # Remplacer 1234 par le PID\n\n# Tuer un processus de force (SIGKILL - A utiliser si l'app est plantée)\nkill -9 1234`} />
    </div>

    <div>
      <h3 className="text-lg font-semibold text-white mb-2">Espace Disque et RAM</h3>
      <CodeBlock code={`# Voir l'espace disque restant en format humainement lisible (Gigaoctets)\ndf -h\n\n# Voir le poids d'un dossier spécifique\ndu -sh /var/log/\n\n# Voir la RAM disponible\nfree -h`} />
    </div>
  </div>
);

const SearchAndText = ({ vars }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-emerald-400 border-b border-slate-800 pb-2">Recherche & Manipulation de texte</h2>
    <p className="text-slate-300">Linux brille par sa capacité à chainer des petits outils pour manipuler du texte.</p>

    <div>
      <h3 className="text-lg font-semibold text-white mb-2">Lire des fichiers</h3>
      <CodeBlock code={`# Afficher tout le fichier d'un coup\ncat ${vars.filename}\n\n# Lire un grand fichier page par page (Espace = avancer, q = quitter)\nless /var/log/syslog\n\n# Afficher les 10 dernières lignes d'un fichier en temps réel (Super utile pour les logs !)\ntail -f /var/log/nginx/error.log`} />
    </div>

    <div>
      <h3 className="text-lg font-semibold text-amber-400 mb-2">La Puissance de grep (Recherche)</h3>
      <CodeBlock code={`# Trouver un mot dans un fichier\ngrep "Erreur" log.txt\n\n# Trouver un mot dans TOUS les fichiers d'un dossier, sans se soucier des majuscules (-ri)\ngrep -ri "password" /etc/`} />
    </div>

    <div>
      <h3 className="text-lg font-semibold text-amber-400 mb-2">Redirections et Pipes (|)</h3>
      <p className="text-sm text-slate-400 mb-2">Le caractère <code>|</code> (Pipe) prend le résultat de la commande de gauche et l'envoie à la commande de droite.</p>
      <CodeBlock code={`# Créer ou écraser un fichier avec du texte (>)\necho "Hello World" > ${vars.filename}\n\n# Ajouter du texte à la fin du fichier (>>)\necho "Ligne 2" >> ${vars.filename}\n\n# Lister les processus ET chercher "ssh" dans le résultat\nps aux | grep ssh`} />
    </div>
    
    <div>
      <h3 className="text-lg font-semibold text-white mb-2">Trouver des fichiers (find)</h3>
      <CodeBlock code={`# Chercher un fichier par son nom dans tout le système\nfind / -name "${vars.filename}"\n\n# Chercher tous les fichiers de plus de 100 Mo\nfind / -type f -size +100M`} />
    </div>
  </div>
);

const Packages = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-emerald-400 border-b border-slate-800 pb-2">Gestion des Paquets (APT)</h2>
    <p className="text-slate-300">Sur Debian/Ubuntu, on utilise <code>apt</code> pour installer des logiciels depuis des dépôts sécurisés.</p>

    <ProTip>
      Il faut toujours mettre à jour la liste des paquets (<code>update</code>) avant d'installer un nouveau logiciel ou de faire les mises à jour (<code>upgrade</code>).
    </ProTip>

    <CodeBlock code={`# 1. Mettre à jour la liste des logiciels disponibles\nsudo apt update\n\n# 2. Installer les mises à jour du système\nsudo apt upgrade -y\n\n# 3. Chercher un paquet\napt search nginx\n\n# 4. Installer un paquet\nsudo apt install nginx -y\n\n# 5. Désinstaller un paquet (et nettoyer ses dépendances non utilisées)\nsudo apt autoremove nginx`} />
  </div>
);

const Network = ({ vars }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-emerald-400 border-b border-slate-800 pb-2">Réseau & SSH</h2>
    <p className="text-slate-300">Les outils indispensables pour diagnostiquer le réseau et se connecter à distance.</p>

    <div>
      <h3 className="text-lg font-semibold text-white mb-2">Diagnostic local</h3>
      <CodeBlock code={`# Afficher l'adresse IP de la machine\nip addr\n\n# Vérifier si un serveur est en ligne (Ctrl+C pour stopper)\nping 8.8.8.8`} />
    </div>

    <div>
      <h3 className="text-lg font-semibold text-white mb-2">Web et Téléchargement</h3>
      <CodeBlock code={`# Télécharger un fichier depuis internet\nwget https://example.com/file.zip\n\n# Interroger une API ou récupérer le code HTML d'une page\ncurl -I https://google.com`} />
    </div>

    <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl mt-6">
      <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2 mb-4">
        <Server size={24}/> La Magie du SSH
      </h3>
      <p className="text-slate-300 mb-4 text-sm">SSH (Secure Shell) permet de prendre le contrôle d'une machine distante de manière chiffrée.</p>
      
      <CodeBlock code={`# Se connecter à un serveur distant\nssh ${vars.user}@${vars.ip}\n\n# Se connecter avec un port spécifique (si différent de 22)\nssh -p 2222 ${vars.user}@${vars.ip}\n\n# Copier un fichier local VERS le serveur distant (SCP)\nscp local_backup.zip ${vars.user}@${vars.ip}:/home/${vars.user}/`} />
    </div>
  </div>
);

const UsersAndSudo = ({ vars }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-emerald-400 border-b border-slate-800 pb-2">Utilisateurs & Sudo</h2>
    <p className="text-slate-300">La gestion des utilisateurs permet d'isoler les applications et d'améliorer la sécurité globale du système.</p>

    <div>
      <h3 className="text-lg font-semibold text-amber-400 mb-2">Le Super-Administrateur (Sudo)</h3>
      <p className="text-sm text-slate-400 mb-2">Il ne faut <strong>jamais</strong> utiliser le compte <code>root</code> directement. On utilise un compte normal, et on préfixe les commandes dangereuses par <code>sudo</code>.</p>
      <CodeBlock code={`# Exécuter une commande avec les droits root\nsudo apt update\n\n# Passer temporairement root (déconseillé)\nsudo su -`} />
    </div>

    <div>
      <h3 className="text-lg font-semibold text-white mb-2">Créer et gérer des utilisateurs</h3>
      <CodeBlock code={`# Créer un nouvel utilisateur avec son dossier personnel (-m)\nsudo useradd -m -s /bin/bash nouveau_dev\n\n# Changer le mot de passe d'un utilisateur\nsudo passwd nouveau_dev\n\n# Ajouter un utilisateur au groupe 'sudo' (pour qu'il devienne admin)\nsudo usermod -aG sudo nouveau_dev\n\n# Changer d'utilisateur dans le terminal\nsu - nouveau_dev`} />
    </div>
  </div>
);

const Automation = ({ vars }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-emerald-400 border-b border-slate-800 pb-2">Automatisation (Bash & Cron)</h2>
    <p className="text-slate-300">Pourquoi faire une tâche manuellement quand le serveur peut la faire pour vous ?</p>

    <div>
      <h3 className="text-lg font-semibold text-white mb-2">Scripts Bash</h3>
      <p className="text-sm text-slate-400 mb-2">Un script est juste un fichier texte contenant une suite de commandes.</p>
      <CodeBlock code={`# 1. Créer le fichier\nnano backup.sh\n\n# 2. Contenu du fichier (le "Shebang" indique que c'est du bash)\n#!/bin/bash\necho "Début de la sauvegarde..."\ntar -czf /backup/site.tar.gz /var/www/html\necho "Terminé !"\n\n# 3. Rendre le script exécutable (Crucial !)\nchmod +x backup.sh\n\n# 4. Lancer le script\n./backup.sh`} />
    </div>

    <div>
      <h3 className="text-lg font-semibold text-white mb-2">Planifier avec Cron</h3>
      <p className="text-sm text-slate-400 mb-2">Le service Cron lance des commandes à des intervalles précis.</p>
      <CodeBlock code={`# Éditer la table de planification de l'utilisateur courant\ncrontab -e`} />
      
      <div className="bg-slate-900 border border-slate-700 p-4 rounded-lg mt-4 font-mono text-sm">
        <p className="text-slate-500 mb-2"># Structure d'une tâche Cron (Minutes Heures Jours Mois JoursSemaine Commande)</p>
        <p className="text-emerald-400">* * * * * <span className="text-white">/chemin/vers/script.sh</span> <span className="text-slate-500 ml-4"># S'exécute chaque minute</span></p>
        <p className="text-emerald-400">0 2 * * * <span className="text-white">/chemin/vers/script.sh</span> <span className="text-slate-500 ml-4"># S'exécute tous les jours à 02:00</span></p>
        <p className="text-emerald-400">0 0 * * 0 <span className="text-white">/chemin/vers/script.sh</span> <span className="text-slate-500 ml-4"># S'exécute tous les Dimanches à minuit</span></p>
      </div>
    </div>
  </div>
);

// --- APPLICATION PRINCIPALE ---

const SECTIONS = [
  { id: 'fund', title: 'Fondamentaux', icon: Cpu, component: Fundamentals },
  { id: 'nav', title: 'Navigation & Fichiers', icon: Folder, component: Navigation },
  { id: 'fhs', title: 'Arborescence FHS', icon: FileText, component: FileSystemTree },
  { id: 'perms', title: 'Permissions (Chmod)', icon: Shield, component: PermissionsCalculator },
  { id: 'proc', title: 'Processus & Ressources', icon: Activity, component: Processes },
  { id: 'text', title: 'Recherche & Texte', icon: Search, component: SearchAndText },
  { id: 'pkg', title: 'Gestion des Paquets', icon: Package, component: Packages },
  { id: 'net', title: 'Réseau & SSH', icon: Globe, component: Network },
  { id: 'users', title: 'Utilisateurs & Sudo', icon: Users, component: UsersAndSudo },
  { id: 'auto', title: 'Automatisation (Cron)', icon: Settings, component: Automation },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('fund');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollRef = React.useRef(null);

  // Remonter en haut de la page lors d'un changement d'onglet
  useEffect(() => {
    // 1. Force le scroll global (si la hauteur n'est pas contrainte)
    window.scrollTo(0, 0);
    
    // 2. Force le scroll du conteneur (si la hauteur est contrainte)
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [activeTab]);
  
  // Variables Dynamiques Globales
  const [dynamicVars, setDynamicVars] = useState({
    filename: 'config.json',
    user: 'jean',
    ip: '192.168.1.50'
  });
  const [showVarHelp, setShowVarHelp] = useState(false);

  const handleVarChange = (e) => {
    setDynamicVars({ ...dynamicVars, [e.target.name]: e.target.value });
  };

  const ActiveComponent = SECTIONS.find(s => s.id === activeTab)?.component || Fundamentals;
  
  // Calcul de la progression
  const activeIndex = SECTIONS.findIndex(s => s.id === activeTab);
  const progressPercentage = ((activeIndex + 1) / SECTIONS.length) * 100;

  return (
    <div className="h-screen w-full overflow-hidden bg-slate-950 text-slate-200 font-sans flex flex-col md:flex-row">
      
      {/* Bouton Menu Mobile */}
      <div className="shrink-0 md:hidden bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center z-50">
        <div className="flex items-center gap-2 font-bold text-emerald-500">
          <FaLinux size={24} />
          <span>Linux Guide</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-300">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed md:relative top-0 left-0 z-40 h-full w-72 bg-slate-900 border-r border-slate-800 
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        flex flex-col
      `}>
        <div className="p-6 hidden md:flex items-center gap-3 font-bold text-emerald-500 border-b border-slate-800">
          <FaLinux size={28} />
          <span className="text-xl tracking-tight">Linux Guide</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 mt-2 px-3 flex items-center justify-between">
            <span>Programme du cours</span>
            <span className="text-emerald-500/80 font-mono">{Math.round(progressPercentage)}%</span>
          </div>
          {SECTIONS.map((section) => {
            const Icon = section.icon;
            const isActive = activeTab === section.id;
            return (
              <button
                key={section.id}
                onClick={() => { setActiveTab(section.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left
                  ${isActive 
                    ? 'bg-emerald-500/10 text-emerald-400 font-medium border border-emerald-500/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'
                  }
                `}
              >
                <Icon size={18} className={isActive ? 'text-emerald-500' : 'text-slate-500'} />
                {section.title}
              </button>
            )
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative">
        
        {/* Dynamic Variables Header */}
        <div className="shrink-0 relative bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-30 p-4 md:px-8">
          <div className="max-w-4xl mx-auto flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between relative">
            
            {/* Titre et Info */}
            <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold relative">
              <Settings size={16} /> 
              <span>Variables du cours :</span>
              <button 
                onClick={() => setShowVarHelp(!showVarHelp)}
                className="text-slate-400 hover:text-amber-400 transition-colors ml-1 p-1 rounded-full hover:bg-slate-800"
                aria-label="Informations sur les variables"
              >
                <HelpCircle size={16} />
              </button>

              {/* Tooltip d'information */}
              {showVarHelp && (
                <div className="absolute top-8 left-0 w-72 sm:w-96 bg-slate-800 border border-slate-700 p-4 rounded-lg shadow-2xl z-50">
                  <p className="text-slate-300 text-sm font-normal leading-relaxed mb-3">
                    Personnalisez ces valeurs pour mettre à jour tous les <span className="text-emerald-400 font-mono">blocs de code</span> en temps réel :
                  </p>
                  <ul className="text-sm text-slate-400 space-y-2 list-disc list-inside">
                    <li><strong className="text-emerald-300">Fichier :</strong> Cible des commandes de manipulation et permissions (<code className="font-mono text-xs text-slate-300">cp</code>, <code className="font-mono text-xs text-slate-300">chmod</code>, <code className="font-mono text-xs text-slate-300">cat</code>...).</li>
                    <li><strong className="text-emerald-300">User :</strong> L'utilisateur local ou distant visé par les commandes (<code className="font-mono text-xs text-slate-300">chown</code>, <code className="font-mono text-xs text-slate-300">ssh</code>, <code className="font-mono text-xs text-slate-300">useradd</code>...).</li>
                    <li><strong className="text-emerald-300">IP :</strong> L'adresse du serveur distant pour le réseau (<code className="font-mono text-xs text-slate-300">ssh</code>, <code className="font-mono text-xs text-slate-300">scp</code>...).</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Inputs grid pour un meilleur responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full xl:w-auto text-xs font-mono">
              <label className="flex items-center gap-2 bg-slate-950 border border-slate-700 p-2 rounded-md focus-within:border-emerald-500/50 transition-colors group">
                <span className="text-slate-400 shrink-0 group-focus-within:text-slate-300">Fichier:</span>
                <input type="text" name="filename" value={dynamicVars.filename} onChange={handleVarChange} 
                  className="bg-transparent text-emerald-400 focus:outline-none w-full min-w-0" />
              </label>
              <label className="flex items-center gap-2 bg-slate-950 border border-slate-700 p-2 rounded-md focus-within:border-emerald-500/50 transition-colors group">
                <span className="text-slate-400 shrink-0 group-focus-within:text-slate-300">User:</span>
                <input type="text" name="user" value={dynamicVars.user} onChange={handleVarChange} 
                  className="bg-transparent text-emerald-400 focus:outline-none w-full min-w-0" />
              </label>
              <label className="flex items-center gap-2 bg-slate-950 border border-slate-700 p-2 rounded-md focus-within:border-emerald-500/50 transition-colors group">
                <span className="text-slate-400 shrink-0 group-focus-within:text-slate-300">IP:</span>
                <input type="text" name="ip" value={dynamicVars.ip} onChange={handleVarChange} 
                  className="bg-transparent text-emerald-400 focus:outline-none w-full min-w-0" />
              </label>
            </div>

          </div>
          
          {/* Barre de progression */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-800">
            <div 
              className="h-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.9)] transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Dynamic Content */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-4xl mx-auto pb-20">
            <ActiveComponent vars={dynamicVars} />
          </div>
        </div>

      </main>
      
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}