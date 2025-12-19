import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-base-200 text-base-content border-t border-base-300">
      {/* Bottom Copyright */}
      <div className="footer footer-center p-4 border-t border-base-300 bg-base-300">
        <aside>
          <p className="text-xs opacity-60">
            Copyright © {new Date().getFullYear()} - All right reserved by BondWave Industries Ltd
          </p>
        </aside>
      </div>
    </footer>
  );
}

export default Footer;
