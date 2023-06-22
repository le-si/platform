# Installing and Running the UI {#animation-install-ui}

To create animations and test the functionality of the SDK you can run the UI in just two steps:

```bash
pip install "stability_sdk[anim_ui]"   # Install the Animation SDK
python3 -m stability_sdk animate --gui # Launch the UI, may need to invoke python instead of python3 on Windows.
```

# Animation SDK Installation {#animation-sdk-install}

When developing applications you will want to set up a Python virtual environment and install the Animation SDK into it:

```bash
# Create a folder for your project.
mkdir my-project
cd my-project

# Create a Python virtual environment.
python3 -m venv venv # May need to invoke python instead of python3 on Windows.

# Activate the virtual environment.
source venv/bin/activate   # macOS / Linux
venv\Scripts\activate.bat  # Windows

# Install the Animation SDK (use [anim_ui] if you'd also like to use the UI).
pip install "stability-sdk[anim]"
```

Once installed, you can [start using the Animation APIs](/docs/features/animation/using) in your Python scripts!
