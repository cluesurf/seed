#!/bin/sh
# Check a few code/vibe modules with every diagnostic printed. The whole package takes tens of minutes, and above
# sixteen files `term make` runs in parallel and prints only the first diagnostic per file, so this links just the
# named modules (and the shared atoms) into a fresh small package under tmp/runs and builds that.
#
# usage: sh control/check.sh law tone role heisenberg
root=$(cd "$(dirname "$0")/.." && pwd)
pkg=$root/tmp/runs/check-$$
mkdir -p $pkg/code/vibe
ln -sfn $root/code/atom $pkg/code/atom
printf '\ndeck @term/seed\n  head <check>\n  mark <0.0.2>\n  sort tool\n  lock mit\n  bear ./code\n' > $pkg/deck.tree
for name in "$@"; do
  ln -sf $root/code/vibe/$name.tree $pkg/code/vibe/$name.tree
done
cd $pkg || exit 2
node $root/../term/host/line.js make 2>&1
