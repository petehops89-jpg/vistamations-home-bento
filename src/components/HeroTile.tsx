interface LinkOverlay {
  id: string;
  label: string;
  left: string;
  top: string;
  width: string;
  height: string;
  href: string;
}

const linkOverlays: LinkOverlay[] = [
  { id: "agent-platform", label: "Agent Platform", left: "35.1%", top: "9.0%", width: "6.2%", height: "3.0%", href: "#agent-platform" },
  { id: "mcp", label: "MCP", left: "44.9%", top: "9.0%", width: "2.5%", height: "3.0%", href: "#mcp" },
  { id: "data-analysis", label: "Data Analysis", left: "50.7%", top: "9.0%", width: "7.4%", height: "3.0%", href: "#data-analysis" },
  { id: "governing-ai", label: "Governing AI Agents", left: "61.6%", top: "9.0%", width: "10.4%", height: "3.0%", href: "#governing-ai" },
  { id: "taskforce", label: "Multi Agent Taskforce", left: "6.0%", top: "53.1%", width: "15.6%", height: "6.2%", href: "#taskforce" },
  { id: "secure-services", label: "Secure Services", left: "22.8%", top: "53.1%", width: "12.6%", height: "6.2%", href: "#secure-services" },
  { id: "voyage", label: "VOYAGE", left: "9.5%", top: "69.2%", width: "11.1%", height: "19.0%", href: "#voyage" },
  { id: "discover", label: "DISCOVER", left: "22.5%", top: "69.2%", width: "11.2%", height: "19.0%", href: "#discover" },
  { id: "adventure", label: "ADVENTURE", left: "35.6%", top: "69.2%", width: "11.3%", height: "19.0%", href: "#adventure" },
  { id: "connect", label: "CONNECT", left: "48.9%", top: "69.2%", width: "11.2%", height: "19.0%", href: "#connect" },
  { id: "assist", label: "ASSIST", left: "62.0%", top: "69.2%", width: "11.2%", height: "19.0%", href: "#assist" },
  { id: "trust", label: "TRUST", left: "75.3%", top: "69.2%", width: "11.2%", height: "19.0%", href: "#trust" },
];

function HeroTile() {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-3xl"
      style={{
        backgroundImage: "url(/home-image-current.png)",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(20, 20, 20, 0.65)",
      }}>
      {linkOverlays.map((link) => (
        <a key={link.id} href={link.href} title={link.label}
          className="absolute cursor-pointer hover:bg-cyan-400/10 transition-colors duration-200 rounded-lg"
          style={{ left: link.left, top: link.top, width: link.width, height: link.height }} />
      ))}
    </div>
  );
}

export default HeroTile;
