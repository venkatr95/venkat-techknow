# venkat-techknow

Personal knowledge base and hands-on experiments across systems programming, machine learning, 3D data, networking, and web tooling.

---

## Repository layout

| Path | Topic | Description |
|------|--------|-------------|
| [`C++/`](C++/) | C++ multithreading | Threading basics with `std::thread` (function pointers, functors, lambdas) and a parallel accumulate example |
| [`networking/`](networking/) | TCP sockets | Simple TCP client/server (`tcpserver.cpp`, `tcpclient.cpp`) |
| [`mqtt-broker-example/`](mqtt-broker-example/) | MQTT | Minimal MQTT consumer using Eclipse Paho C++ |
| [`icp/`](icp/) | Point clouds / registration | Iterative Closest Point on the Stanford Bunny dataset |
| [`pointcloud_downsampling/`](pointcloud_downsampling/) | Point clouds | Voxel-grid downsampling with Open3D |
| [`ML_Basics/`](ML_Basics/) | Classical ML | Iris dataset classification (LR, LDA, KNN, CART, NB, SVM) |
| [`tf_rnn/`](tf_rnn/) | Deep learning / NLP | IMDB text classification with LSTM and CNN-LSTM (RCNN), plus SHAP DeepExplainer notes |
| [`vae/`](vae/) | Generative models | Variational Autoencoder on MNIST (Keras) with latent-space visualization |
| [`nlp/StockpricePrediction/`](nlp/StockpricePrediction/) | Time series / NLP | Stock price visualization and prediction from Yahoo Finance data |
| [`xml_parser/`](xml_parser/) | Data wrangling | Parse XML inputs into a pandas DataFrame / CSV |
| [`test-chart-http-interface/`](test-chart-http-interface/) | Web / React | React + Vite chart app over Canvas; Node mini-backend for HTTP data |
| [`linux_commands/`](linux_commands/) | Cheatsheet | Linux / VirtualBox command notes |
| [`linux_tools/`](linux_tools/) | Cheatsheet | Vim command notes |
| [`windows_pranks/`](windows_pranks/) | Fun / Windows | Harmless Windows taskbar prank script |
| [`CMAKE_dll.txt`](CMAKE_dll.txt) | Build notes | CMake/Qt `windeployqt` and Visual Studio linker flags |

---

## Projects (quick start)

### C++ multithreading — `C++/`

Notes and examples for launching threads with callable types (function pointer, functor, lambda).

```sh
# Example: parallel accumulate with function pointer
g++ -std=c++17 -lpthread basic_thread_fnptr.cpp -I ./
```

See [`C++/README.md`](C++/README.md).

### TCP client/server — `networking/`

Compile client and server with `g++`, run each in its own terminal to establish communication (server listens on port `54000`).

See [`networking/README.md`](networking/README.md).

### MQTT consumer — `mqtt-broker-example/`

Simple MQTT consumer/producer example (Paho async client, default broker `localhost:1883`). Build with CMake.

See [`mqtt-broker-example/README.md`](mqtt-broker-example/README.md).

### ICP (bunny) — `icp/`

Iterative Closest Point registration experiments using the Stanford 3D Scanning Repository bunny mesh (`bun045.ply`).

See [`icp/README.md`](icp/README.md).

### Point cloud downsampling — `pointcloud_downsampling/`

Voxel-size downsampling of XYZ point clouds (Open3D + NumPy + Matplotlib).

```sh
# Create venv, install deps, then:
python down_sampler.py path_to_file voxel_size
# e.g.
python down_sampler.py studenttask_cloud_downsampling.xyz 3
```

See [`pointcloud_downsampling/README.md`](pointcloud_downsampling/README.md).

### Classical ML — `ML_Basics/`

Compares several scikit-learn classifiers on the Iris dataset with k-fold cross-validation.

```sh
python iris_dataset.py
```

### LSTM / RCNN text classification — `tf_rnn/`

Keras examples for IMDB sentiment classification:

- LSTM — based on the Keras IMDB LSTM example  
- RCNN (CNN-LSTM) — based on the Keras IMDB CNN-LSTM example  
- Notes on SHAP DeepExplainer for model interpretability  

See [`tf_rnn/Readme.txt`](tf_rnn/Readme.txt).

### VAE on MNIST — `vae/`

Variational Autoencoder trained on MNIST, with PCA/t-SNE visualization of the latent space. Pretrained weights and latent plots live under `vae/vae_mnist/`.

```sh
python vae/vae_mnist/VAE_mnist.py
```

### Stock price prediction — `nlp/StockpricePrediction/`

Jupyter notebook: visualize historical prices and predict prices over a chosen horizon using Yahoo Finance data.

See [`nlp/StockpricePrediction/README.md`](nlp/StockpricePrediction/README.md).

### XML parser — `xml_parser/`

Reads `inputs.xml`, computes a derived `Y` from feature fields, and exports a CSV via pandas.

```sh
python xml_parser.py
```

### React chart + HTTP interface — `test-chart-http-interface/`

Frontend draws data points on HTML Canvas; a small Express server feeds the chart over HTTP.

```sh
# Mini-backend
node server.js

# Frontend
npm install
npm run dev
# open http://localhost:5173
```

See [`test-chart-http-interface/README.md`](test-chart-http-interface/README.md).

### Cheatsheets & misc

- **Linux commands** — disk space, VirtualBox resize, and related notes: [`linux_commands/General Commands.md`](linux_commands/General%20Commands.md)  
- **Vim** — [`linux_tools/Vim Commands.md`](linux_tools/Vim%20Commands.md)  
- **Windows pranks** — hide taskbar + `prank.bat` loop: [`windows_pranks/README.md`](windows_pranks/README.md)  
- **CMake / Qt deploy** — `windeployqt`, output directories, `/SAFESEH` notes: [`CMAKE_dll.txt`](CMAKE_dll.txt)

---

## Tech stack (by area)

| Area | Tools / libraries |
|------|-------------------|
| Systems / C++ | C++17, `std::thread`, POSIX sockets, MQTT (Paho), CMake |
| 3D / point clouds | Open3D, NumPy, Matplotlib, PLY |
| Machine learning | scikit-learn, pandas, Keras / TensorFlow, SHAP |
| Web | React 19, TypeScript, Vite, Express, Canvas API |
| Scripting / data | Python, XML (ElementTree), Jupyter |

---

## Notes

- Subfolders are largely **independent**; each has its own deps and (where present) local README.
- Prefer per-project docs linked above for install and run details.
- Some examples target Linux/POSIX sockets or Windows-only scripts; check the folder README before running.
