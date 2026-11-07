"""Local-only credential entry. Never uploads or prints the key."""
import getpass
import os
from pathlib import Path

def main():
    key = getpass.getpass('Paste your Groq API key (hidden): ').strip()
    if not key.startswith('gsk_') or any(c.isspace() for c in key):
        raise SystemExit('Unexpected key format; nothing saved.')
    folder = Path(__file__).resolve().parent / '.secrets'
    folder.mkdir(mode=0o700, exist_ok=True)
    os.chmod(folder, 0o700)
    path = folder / 'groq-key'
    flags = os.O_WRONLY | os.O_CREAT | os.O_TRUNC | os.O_NOFOLLOW
    fd = os.open(path, flags, 0o600)
    with os.fdopen(fd, 'w') as f:
        os.fchmod(f.fileno(), 0o600)
        f.write(key)
    print('Key saved locally in the ignored .secrets folder. Do not upload that folder.')

if __name__ == '__main__':
    main()
