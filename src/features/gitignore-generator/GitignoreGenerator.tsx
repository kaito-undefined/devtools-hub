const GITIGNORE_OUTPUT_LIST = {
    "Node.js": "node_modules/\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\n.pnpm-debug.log*\n",
    "React": "node_modules/\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\n.pnpm-debug.log*\ndist/\nbuild/\n.eslintcache\n.env.development.local\n.env.test.local\n.env.production.local\n",
    "Next.js": "node_modules/\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\n.pnpm-debug.log*\n.next/\nout/\n.env.development.local\n.env.test.local\n.env.production.local\n.pnp*\n.pnp.js\n",
    "Astro": "node_modules/\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\n.pnpm-debug.log*\ndist/\n.astro/\n.env.production\n",
    "Python": "__pycache__/\n*.pyc\n*.pyo\n*.pyd\n.Python\nenv/\nvenv/\n.venv/\npip-log.txt\npip-delete-this-directory.txt\n.sqlite\n",
    "Java": "*.class\n*.jar\n*.war\n*.ear\ntarget/\n.idea/\n*.iml\n.gradle/\nbuild/\n"
}

const GITIGNORE_OUTPUT_SHARED = ".env\n.env.local\nlogs/\n*.log\n";

type techs = keyof typeof GITIGNORE_OUTPUT_LIST;

import ToolActions from "../../components/tool/ToolActions";
import ToolTextarea from "../../components/tool/ToolTextarea";
import Button from "../../ui/Button";
import CopyButton from "../../ui/CopyButton";
import { useState } from 'react';

export default function GitignoreGenerator() {
    const [gitignoreOutput, setGitignoreOutput] = useState("");
    const [selectedTech, setSelectedTech] = useState<techs | null>(null);

    function clearGitignoreOutput() {
        setGitignoreOutput("");
        setSelectedTech(null);
    }

    function selectTech(tech: techs){
        if(tech === selectedTech) return; //no un-selecting functionality because there is a clear button
        setSelectedTech(tech);
        setGitignoreOutput(GITIGNORE_OUTPUT_SHARED + GITIGNORE_OUTPUT_LIST[tech]);
    }

    return (
        <div>
            <div>
                <div className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">

                        <div className="flex flex-col justify-center space-y-1">
                            <label className="text-lg font-semibold tracking-wide uppercase text-secondary">
                                Technologies & Frameworks
                            </label>
                            <p className="text-sm text-muted">
                                Select the technology/framework to instantly generate your custom .gitignore file.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                            {Object.keys(GITIGNORE_OUTPUT_LIST).map((key) => {
                                const tech = key as techs;
                                
                                return(
                                    <button
                                        type="button"
                                        key={tech}
                                        onClick={() => selectTech(tech)}
                                        className={`flex items-center justify-center rounded-xl border px-4 py-2.5 text-sm font-medium transition-all active:scale-95 ${(selectedTech === tech) ? 'border-accent bg-accent-bg text-accent shadow-sm shadow-accent/5' : 'border-border bg-surface text-primary hover:border-border-hover hover:bg-elevated'}`}
                                    >{tech}</button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <ToolTextarea
                label="Output"
                value={gitignoreOutput}
                readOnly
                textColor="accent"
                rows={17}
            />

            <ToolActions className="mt-4">
                <Button onClick={clearGitignoreOutput}>Clear</Button>
                <CopyButton value={gitignoreOutput}/>
            </ToolActions>
        </div>
    )
}