kill -9 `cat ../../osmo-nitb.pid`

bash -c 'osmo-nitb -C ../../openbsc.cfg &>../../log & jobs -p %1 && echo $! > ../../osmo-nitb.pid'
sleep 2s
#bash -c 'osmo-bts-trx -c osmo-bts.cfg &>$PWD/log & jobs -p %1 && echo $! > $PWD/osmo-bts-trx.pid'
