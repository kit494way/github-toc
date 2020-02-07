#!/usr/bin/env bash
set -eu

trap "cleanup" EXIT

cleanup()
{
  rm ${project_dir}/manifest.json ${project_dir}/browser-polyfill.min.js
}

project_dir=$(cd $(dirname ${BASH_SOURCE})/..; pwd)
target=${1:-firefox}

case "${target}" in
  firefox|chrome)
    echo "Build start for ${target}."
    ;;
  *)
    echo "Target must be firefox or chrome but ${target} was specified."
    exit 1
esac

cp ${project_dir}/manifests/manifest.${target}.json ${project_dir}/manifest.json
cp ${project_dir}/node_modules/webextension-polyfill/dist/browser-polyfill.min.js ${project_dir}
npx web-ext build -c ${project_dir}/web-ext-config.js --artifacts-dir ${project_dir}/web-ext-artifacts/${target}
