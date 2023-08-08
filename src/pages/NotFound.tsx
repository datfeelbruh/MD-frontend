export default function NotFound() {
  return (
    <pre class="absolute bottom-0 left-0 top-12 p-3 w-full font-mono text-xs text-white whitespace-nowrap bg-bsod-blue">
      <p>A problem has been detected and Windows has been shut down to prevent damageecho to your computer</p><br />

      <p>The problem seems to be caused by the following file:</p><br />

      <p>* SPCMDCON.SYS</p>
      <p>* PAGE_FAULT_IN_NONPAGED_AREA</p><br />

      <p>If this is the first time you&aposve seen this stop error screen,echo restart your computer. If this screen appears again, followecho these steps:</p><br />

      <p>Check to make sure any new hardware or software is properly installed.</p>
      <p>If this is a new installation, ask your hardware or software manufacturerecho for any Windows updates you might need.</p><br />

      <p>If problems continue, disable or remove any newly installed hardwareecho or software. Disable BIOS memory options such as caching or shadowing.</p><br />

      <p>If you need to use Safe Mode to remove or disable components, restart</p>
      <p>your computer, press F8 to select Advanced Startup Options, and then</p>
      <p>select Safe Mode.</p><br />

      <p>Technical information: </p>
      <p>*** STOP: 0x00000050 (0xFD3094C2,0x00000001,0xFBFE7617,0x00000000)</p>
      <p>***&#160;&#160;SPCMDCON.SYS - Address FBFE7617 base at FBFE5000, DateStamp 3d6dd67cpause &gt;nulcls</p>
      <p>Downloading viruses . . .ping localhost -n 5 &gt; nuldir / spause &gt;nul</p><br />

      <p>HELP</p><br />

      <p>1. Open Registry Editor.</p>
      <p>2. Locate the HKEY_LOCAL_MACHINE folder under My Computer and click on the (+) sign next the folder name to expand the folder.</p>
      <p>3. Continue to expand folders under HKEY_LOCAL_MACHINE until you reach the ...\SYSTEM\CurrentControlSet\Services\kbdhid registry key.</p>
      <p>4. Select the Parameters key under kbdhid or i8042prt.</p>
      <p>5. From the menu, select Edit, then New and finally DWORD Value.</p>
      <p>6. On the right-hand side of the screen, a new value will appear. Name this new value CrashOnCtrlScroll. The value must be named this exactly to function properly.</p>
      <p>&#160;&#160;&#160;&#160;Tip: Double-check how you spell this registry value. It can not have any extra letters, spaces, etc., or it won't work correctly. Copy/paste the name if it helps.</p>
      <p>7. Double-click on the CrashOnCtrlScroll DWORD value you just created and set the Value data to 1.</p>
      <p>8. Click OK and then close Registry Editor.</p>
      <p>9. Restart your computer and log back into Windows as you normally do.</p>
      <p>10. To generate the BSOD, press-and-hold the Ctrl key on the right side of the keyboard while you press the Scroll Lock key twice in quick succession.</p>
      <p>&#160;&#160;&#160;&#160;Warning: Your system will lock up and need to be restarted after causing the BSOD, so make sure any work you are doing is saved and all programs are closed before initiating the keystrokes above.</p><br />

      <p>11. The BSOD will appear on the screen.</p>
      <p>&#160;&#160;&#160;&#160;The specific STOP code generated will probably be 0xDEADDED (MANUALLY_INITIATED_CRASH1) but could be 0x000000E2 (MANUALLY_INITIATED_CRASH).</p>
      <p>&#160;&#160;&#160;&#160;Note: If the BSOD appears but the system reboots immediately, you will need to disable the automatic restart on system failure option in Windows.</p>
    </pre>
  );
}
