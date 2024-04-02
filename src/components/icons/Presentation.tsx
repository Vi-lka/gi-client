import { cn } from '@/lib/utils'
import React from 'react'

export default function Presentation({
    className,
}: {
    className?: string,
}) {
    return (
        <svg
            className={cn('w-fit h-20', className)}
            viewBox="0 0 100 100" 
            fill="none"
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <rect opacity="0.7" width="100" height="100" fill="url(#pattern)"/>
            <defs>
                <pattern id="patternPresentation" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_473_9621" transform="scale(0.00195312)"/>
                </pattern>
                <image id="image0_473_9621" width="512" height="512" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAACAASURBVHic7d133CVFmejx3wSGNEMYcs5BRrIoIt4FJXgx7XpVVlcRliBBxIx67xpQV9ewu7jrStJdYU2rqLsYQQVFMggSBSQjmQkwwAyT7h/1vkzgDeecqu6q7v59P5/nY4DT56k+5+16TnV1FUiSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSmmRC7gRaYgNgP2Bv4AXAVsB6wOrAlHxpSZIyehZ4CngUuBP4I3A5cCHwSMa8AAuAGNOBtwCHAXvhuZQk9WYJcAVwDvBtYFaOJOy0+rcx8AHgGMIvfEmSBjUXOB34EvBgnW88qc43a7jJwInAD4C/wKF9SVK8KcA+wHFD//1SYFEdb+wIQG+2A74L7J47EUlSq10DHArcUfUbTaz6DVrg9cDV2PlLkqq3J/B74LVVv5G3AMb2DuA/gVVzJyJJ6oyVgTcDDxFGBCphATC6o4Cv4TmSJNVvIvAa4H7g2irewDkAI3s9cC52/pKkvBYCbwDOS31gC4Dn25Yw5LJG7kQkSQKeJKw3c2vKgzoJcHkrAf+Fnb8kqRzTgG8SHkdPxiHu5X0AeHvuJCRJWsHGwBzgslQH9BbAUhsThlem5k5EkqQRPAlsT3g6IJq3AJb6AHb+kqRyTQPel+pgjgAE04F7cW1/SVLZ5gKbk2ADIUcAgrdi5y9JKt9U4K9zJ9EmVxC2Z0wRNwAnATOwqJCkLlud0BecROgbUvUzl9bZiDbbAFhM/AcyHzgeR1UkSc83ibCj7Hzi+5vFwHr1pt9Oh5Km839F3YlLkhrnAOBZ4vudN8Um4q9V2DvBMd4L/DrBcSRJ7fZLwlNnsVL0XZ33M+Lv+bugkiSpV5OAm4jre34cm4QjALBd5OvPAhalSESS1AmLCLvNxojtuwQ8RlwVtlP9KUuSGu6FxPU9j9SfcvvEzsh09UBJUr+mEdf3zItNwJUAw4mM4TmUJA0ia//jHABJkjrIAkCSpA6yAJAkqYMsACRJ6iALAEmSOsgCQJKkDrIAkCSpgybnTkDPWQN4NWFXwV2BLYG1gJUy5iRJXbYAmA3cDVxH2PTtJ8CTGXNKxkVs8i8EtB1wMvAWYLXIY0mSqvUU8C3gH4A7Io+Vtf+xAMj3AawKnAKchL/yJalpFgD/CHycsKT8ICwAMsvxAWwL/ADYOfK9JUl5XQq8AXh4gNdaAGRW9wewG/ALYP3I95UkleE+4BDgxj5fZwGQWZ0fwLbAJdj5S1Lb3AfsRX8jAW4G1BGrAN/Dzl+S2mgz4IfAyrkT6ZUFQH0+RRj+lyS100uBj+ROolfeAgizN6dEvH4Nxn8mdDvgJpztL0ltN5dwu3e8WwFrAHMi3mc+YWR5YI4AxC/osFkP/87J2PlLUhdMBT7Ww7+3ReT7PBH5egsAYFbk6w8a55+vQVjkR5LUDe8gFAJjGa/vGE9s32UBAPwp8vVHAZPG+OevxhX+JKlLVic8FjiaycCRke9xe+TrLQCAP0a+fgZw/Bj//BWRx5ckNc9Y1/53AS+IPP6tka+3AAAuT3CMLwIHjPLPdk1wfElSs4x27T8I+HyC418WewALALiQ+MUYphB2iHo3z78dsFXksSVJzbP1Cv97MvAe4MfETwpfDFwUeQwfAxxyOfCSRMe6GfgacD5wD/AYcY8ZSpKaZz6wHmFr94MI9/xjh/2HXQq8LNGxOu8EwihAiSFJyiP39X+0ODZF4xwBCKYTfq2P99hGDn5GkpRHiT/CniSsIeBjgInMBM7InYQkSeP4Kgk6fy1vI0JllXtox1sAklSG3Nf/FWMOsEGlLe6wD5D/A7YAkKQy5L7+rxgnVdvcbpsMXE3+D9kCQJLyy339XzauJPRRqtA2wGzyf9gWAJKUV+7r/3DM4vnrCqgirwUWkP9DtwCQpHxyX/+XEPqiV1fdUC3vSMJqS7k/fElSHrmv/4uBIypvpUZ0GPlHAiRJeeS89i8Ejq6+iRrLa8k7J0CSlEeu6/5sHPYvxjbkezpAkpRHjmv+lTjhrziTCc9gzsECQJK6oM5r/VzgE7h5XNE2BL5AfasGSpLyqOMa/yTweWD9mtqkBNYGjidsy1jl0wKSpDyquq4vAi4h7Oq3dm2tWYE7zaWxHrAfsDewI2HOwDrANGDlyGP7GUlSHrE/wuYTfuE/BtwJ3AJcDlw09P9lZedSvdgvkJ+RJOXR6uu32wFLktRBFgCSJHWQBYAkSR1kASBJUgdZAEiS1EEWAJIkdZAFgCRJHWQBIElSB1kASJLUQRYAkiR1kAWAJEkdZAEgSVIHWQBIktRBFgCSJHWQBYAkSR1kASBJUgdZAEiS1EEWAJIkdZAFgCRJHWQBIElSB1kASJLUQRYAkiR1kAWAJEkdZAEgSVIHWQBIktRBFgCSJHWQBYAkSR1kASBJUgdZAEiS1EEWAJIkdZAFgCRJHWQBIElSB1kASJLUQRYAkiR1kAWAJEkdZAEgSVIHWQBIktRBFgCSJHXQ5NwJqHOmAasCU4H5wNPAHGBxzqQkqWssAFSV1YHdgRcDewG7AZsDq43w7y4EHgTuAW4diluAq4GH6khWkqTUlkRGk0wD3gb8GHiW+LYvAW4D/h14OzC9vqZIUqeu36pAF75AewLfIgznp+j0R4uFwIXAu4F1a2mZpC7rwvVbFWrzF+gA4AKq7fRHi3nAfwEHAROqbqikTmrz9Vs1aOMXaA/gIvJ0/CPF9cBhwEoVtllS97Tx+q0atekLtDHhfvwi8nf6I8XdhELAx1slpdCm67cyaMMXaAJwNDCb/J18L3Et4faEJMVow/VbGTX9C7Ql+e7zx8Z5wCbJz4ikrmj69XtMTp4a2SRgG2AHwmzzdYb+Pwgf6kPAfYTn1u9i7A869kuQ6zOaCBwPfJawaE9TzQTeB3wjdyI12YIwWnMI4Tu8Rt501HFPAHcAPwHOBO7Nm07fmnr9Vh9WBg4E/gG4kjDDvNcK73Hgp8BHgRkjHLuJFeS2wG/6yLEJ8W1gzZQnqTATCN/BZ8h/rg1jpHga+DDN6hRj26yC7QucTviVmOpLfivwMWCDofdo0hdoEuHX8lMJ8i4x7gRelOxsleUs8p9fw+glzqQ5YtuqwkwCDgWuotov+Tzg7ATHqcsM4PIE+ZYeTwNvTXTOSnEi+c+rYfQTJ9AMse1UQQ4BbiT/l7+kL9BKwN/R322Ppsdi4DM0ayhyNNOBWeQ/p4bRT8wE1qZ8se1UATYHfkb+L31pX6A9gOsKaGOu+BpLJ3c21XHkP4+GMUgcQ/li21i0LiyYcgxwA/Cq3IkUZE3g88AVwK6Zc8npb4HvEiaBNpXrHaipDsqdQNe1eTvgqYTJJn+dO5GCTCZ0eqewdJJi1/0fwnl5I2GzoabZPHcC0oA2y51A17W1ANiasCXtC3InUoiVCRPfTiasbZDDQ8BlhDkYdw3Fk4QnDp4ldGQ7ArsB+wPb15jb6wlLHL+DMD+gSYofZpRG4XdXye1J6Gxy399KFTHWJzwb/mCGvIe37j2BUJD1a3PgJODqGnM+dYA8czuX/N9Rwxgkvkf5YtuoGr2MsPJU7i92yujXVsB7CAv5LMyQ70PAJ4CNBsh9NDMIz7nX8aTCsQnzrsOx5P+OGsYgcTTli21j0drwGNSwFxPWrG/b0qd3AH8A/kj4Jf8woWOfR5jnsD5hWH8GsDOwXp40eQj4OGHJ3fkVvcfGwIcIM9+nVPQeCwgTRn9d0fFTW5vwHWnCI1XSsJmEpapn505kHLGdeJv62GLtSNrV/IzeYx5hUmGd+wVsS7VD3w+TdgSjaieQ/3tgGP1EU0baYtupik0HbiP/F7qLcQOw+/gfUWUOIWzKVEXbLqJZawScQf7vg2H0EqfRHLFtVYUmEYZqc3+huxhfprph+H6sDXyLatr4kRrbEWsC4SmPp8n/3TCMkeIpwi28Jg2Lx7ZZFfoE+b/UXYuFhLXnS3MY6Tu/ecBOdTYigc0It2SuJtxfzf19Mbodswj7rnySZj73H9v+ojWpElvRywmPmVU9TPtH4LfAPYR18zcFtiM8cdDWdRRG8whhYaULcycyipcA/0OYGJnKxcB+NG99AEnxYjvxJvexxVqFsO1uVVXrVYShqu3GyGE6YeGYyyrMo6S4mDALv3TbALeTtu1/W2sLJJWi1SMATXUK1XRyvySsQtevfWnuZkPjxWLgS4TRj6ZYn/DoZKpz8Gdg9VpbIKkEFgCF2ZL0C8LcDRyYILcDgGsT55Yz7gAOTnBectgAuIV05+Lj9aYvqQAWAIU5m7Sd3OnAtIT5TQSOAO5PnGed8SzwWWC1hOclh00Iew6kOCdP4GI7UtdYABRkBrCINBf0RcC7K8x1NeD/AXMS5VtX/Ap4YQXnI5ddCJsOpTg3f1dz7pLysgAoyNdJcyGfD7y5ppzXI2wy80yi3KuKCwhPVrTRGwhzGWLP0aM4F0DqEguAQmxIunv/R9ScO4R70p8GHh8g36piIXAesE+F7S7Fl0lzzo6qO3FJ2VgAFOKjpLmAf67uxFewGnAk9W5zu2LcRjifm1Tc1pKsSppJgZfXnbikbCwACpHi4v1bwiS9UrwI+Dxhtn2VHf5i4DrgC4Rh/q4uTrE3aW4F7Fx34pKysAAowF7EfxDzKXtZ192A9wM/Iqy4F9PWJ4ArgDOBvyHcflBwDvHfpc/UnrWkHFpdADTll+ApxM/A/ixh2LsptgS2XyZWJtw+WJkwijGFsAXysnEPcNPQfxb/5ctkM8LyzjGPON5MeCJFUrvFXkeb0scW7UriqrCngHVqz1qlSjEhcIfas5ZUt1aPADTBdOKf/f+32rNWybYl/jv1rtqzllQ3C4DMDiL+Q3hB7VmrdP9D3Hfq2/WnLKlmrS4ASpoRP5q9Il9/O+EJAmlZ3418fVsXTZLUEU0oAGKXpf1FkizUNj8m7HkwqE0Ii1NJUiM1oQDYPPL1v0qShdpmDnBx5DF2TJGIJOXQhAJgi8jXP5AkC7XRVZGvd26JpMZqQgGwXuTrn0iShdro2sjXb5UkC0nKoPQCYCXCgjcxZqdIRK30x8jXxxankpRN6QVAiq1XJyU4htppZuTr102ShSRlUHoBsCjBMVwHX6OJLQDWTJKFJGUwOXcC43iKsJhCzHrK6yfKJYUNgG0Ihc19OEExt8W5E5CkXEovABYDzxC3cUvsUwSxJgNHAccCu67wz/4InAacQWin6tXG/SG2AI4GDiEUm2vkTUcd9wRhu/OfEHYnvTdvOmqa24hbivHs+lN+zqbANaPktWzcgJvL5LALcd+tC+tPeVQTCLtdPkP88qWGUUU8DXyYZu2QF9tmRfoFcR/AXfWnDIRV4u7tMcclhNsBW2TJtLv+krjv1vfqT3lUZ5H/Am8YvcSZNEdsW4tW+iRAgDsjX78leZ7XPpuw93yvNgL+G1i1mnQ0gr0jX/9okizinQgcmTsJqUdHASfkTkLNKACuTnCMwxMcox+vAA4c4HW7EvaqVz1eGvn6h5JkEWc6cEruJKQ+fQpYO3cSXdeEAuDyBMc4knonPL4t4rVHAW9PlYhGNR14SeQxbk2RSKRDgbVyJyH1aW3gTbmT6LomFAC3EP+89ibA6xLk0quXRb7+q8BOKRLRqP4aWDnyGDelSCTSAbkTkAZ0UO4Euq4JBcBiwtatsT5DWFq4DrGLD60O/Ih2PqZWindEvv5ZwhMqucXulinl0s8cKVWgCQUAhM4w1o7AuxIcpxcpnunfDvgh8b9S9Xz7Ai+OPMblhCIgt+JnGkuj8LubWVMKgF8Q9m+P9XHCs/lVi91kZtjLCY/MNOm52Sb4+wTH+FWCY6RwX+4EpAH53c2sKQXA06RZ0GdN4PtU/6v6fxIe6+3AxxIer+sOIRRWsX6Z4BgpXJA7AWlA5+dOQM2xHWE+QIqFKL5Rca5rEZ4RT7l4xgcrzrkL1gDuIf6z+DPl7DK5NmGSbO7FXQyjn3icZjy9EttOJfQ/pPsCfrLiXA9PmOsSQvHzzopzbrvTSfNZfKHuxMdxAvkv6IbRTxxLM8S2UwntSthJL9WX8MtUe3899fKsi4ifvd5VbyTdCNJuNefeizPIf1E3jF7iNJojtq1K7Fuk/TJ+h+p2TFuFsJJhynwXEhYLUu92A+aS5vxfXHPuvZoAnEyYL5P7Am8YI8VTwIdo1qTm2DYrsc0ITwSk/GLeDexfUb5bAo8lzncx8JGK8m2bjQmfb6pz/9pas+/fZoSlga8GZpP/om90O2YBVxFuuTbxuf/Y9qsCx5H+i7qIcG+3iiWDX0XaWxfD8U80q5qu2wbAzaQ73zfh+Za6xAKgQBOB66mmYv0l1Twm+LGK8v0usFoF+TbdeqT/jry+1hZIys0CoEB7AguopkNdAny9gpwnAN+sKN/rCLcaFGxN2Kgn5TkuZeEfSfWxACjMFKr79b9sxG4VO1ruv6wo30cJ2xB33YsI2/SmPLcLCU+gSOoWC4DCfILqO/8lhKH1KqwBXFtRzgsIyx3XufVxSY6gmlnwn66zEZKKYQFQkA0Jj5LUUQDMprrV3jYC7qow98uAbSrKvUSrAf9ONefyGurbRVJSWSwACvIl6un8h2O9CtuyI+kfD1w2niCsF9D2Wev7kP5+/3A8BexUX1MkFcYCoBB1/vofjqr3Wn8R1a/j/jtg54rbkcNqwBcJ9+erOG+LgTfX1hpJJbIAKMQnqLfzX0A999J3J/3GQSO15YvAtBraU4c3A/dS7Tmreq8ISeWzACjABOB26i0AflNLy4KdST9zfaR4BHgvsGo9zUpub+Aiqj9P36H9t04kjc8CoAB7U2/nv4Qwo7xOLwAeSJT7eHE/YTeuKbW0LN7uwHnUc25+hJP+JAUWAAX4Z+rt/K8lz37v21H90Pay8SDhscEN62hcnyYABwPnk24Xv/HiJzSnKJJUPQuAAlxHvZ3itvU0a0SbEB49q7PgmQ+cQ1hIKEfhs6x1gfcQ1t2v8xz8gLB7oyQNswDIbA3iZ3r/lLC873j/3jXA9vU0a0yrEzqkOjvA4XgAOJWwEuLEqhs6ZCpwKPB9YF4FbRovTqW+tkpqDguAzA4k/kN40dCx/hehk5m1zD+bD1wCHE5Zw78TgX8gTxEwHI8RztfxhHULUnWSEwkTH99LKM6eydjG9yZqk6T2aXUB0ISZzh8EPh/x+j8Au63w/00ANiVM9vozoQgo1RHAaZRRnMwlbK97/dB/3gc8THiM8VHCvfplrQusT1hQaTPghYTPYgZhlKMETfgbkJRHbCfu9SXSqcRVYB+rP+Xk9gHuJu9oQFtDkkbT6utLE+57bhb5+kuSZJHXpcAuhO2EJUmK1oQCYOPI19+YJIv8ngDeBhxJWBJZkqSBNaEAiHk0azFhIlubfB3YE/h97kQkSc3VhAJgYcRrFwCLUiVSkFsJqyOejKMBkqQBNKEAWHFmeT9Wpr3Lui4gPB2xPWERH0mSetaEAmBe5OtjJxGW7gHgMODVwB2Zc5EkNUQTCoB7I1+/S5IsyvdTwuI6H6Z98x4kSYk1oQC4O/L1B6RIoiGeIaweuCVhPf2Hs2Yj9W8L4NOESa5zyL9OhBEXc4Y+y08BmyP16W+J+wLeR/4NbnKZBnyUMCKQ+0KQOuYC/5LgOCrDBMJ3Neey0Ea18TRhhLJJq+PFtlmRXkz8h/Dm2rMuyzTgncDV5L8IxMaDwN8B6wy1zT/QdjiL/N8to544k+aIbasiTQZmE/chXD90HMEehL0FmjS8ugg4H3gjz3+qwz/Q5juR/N8xo944gWaIbacSOI/4D+L9tWddtqmEHRB/SBhOz31BGCmuBj7A2E9y+AfabNNZfndOoxsxE1ib8sW2Uwm8l/gPYh5h8Rw938rAwYR76neS76LwNPAzwq+DrXrM3T/QZjuO/J2RkSeOoXyxbSxaUyZjbALcQ/xkvoeAVwC3RGfUbtsBLyIsObwHsDuwVgXvcxdhu+bLCJs2XU3/WzPH/pE15W+grc4F3pA7CWVxLuG2XslafX0pOrkV/AQ4JMFxHgFeB1yR4Fhdsg2wK+FRni2BTYF1CUO4qxMKhGW/T3MJnfnjhKcQHiU80nknYcGimwjzEGK1+g+0A64iFJvqniuBl+ROYhxeXwrxBtINPc0HPkh7lwnuklYP0XXAleQfijbyxOWUL7aNRWvCQkDDziN+UaBhUwjr6F8PvGXof0uq3325E1A2fvaZNakAWAB8LPExdwS+RVhu+CzgrwnL6a6a+H0kjeyC3Akom/NzJ9B1Tbs/MRG4jtBJV20WYQnL7wP/Tv+T01SP2GG2pv0NtM3ahDkhTXgkTOnMJMwrmp07kXF4fSnMq6j/XtWd+AhhqVp9j64jTiD//Wij3jiWZohtpypwJvV/YZ8BDqyjceqLf6DtcAb5OyWjnjiN5ohtqyowFfgT9X9xZxIef1M5/ANthwnAyYTFoHJ3UEY18RTwIZo1LB7bZlVkb8LqfnV/ib9eR+PUM/9A22Uz4BTColCxe4AY+WMWYa2HTzL2kt6l8vpSsDcTNoqp8ws9j7C7nsrgH6ikqnh9KVyKfQL6jYNraZl64R+opKq0+vrSpHUARvNPwMdrfs8mDmVJkvScNhQAEO4ZHkFYLKgOG9T0Phrb6pGvX5gkC0lqoLYUAAD/AfwlaTaYGc/0Gt5D41sn8vUu7iSps9pUAAD8FNgFuKji94nteJTGupGvn5ckC0lqoLYVABDW9X8l4XnTZyp6D0cAyhD7OTgCIKmz2lgAACwGvgBsT1g1MPW9XkcAyhA7AmABIKmz2loADLsfOAZ4IXA26UYELADKEPs5PJYkC0lqoLYXAMNuBd4BbEzYeOS6yONtRLOWs2yrjSNf/2CSLCRJjbED8Qs8uCdAfj8k7jP8av0pS2oQFwJqoXuI/3B2SpGIosyIfL0jAJI6q6sFwDzgochjWADktQqwdeQxHkiRiCQ1UVcLAAijADEsAPLaAZgUeYxbUiQiSU3U5QLgjsjXxw4/K06KAuzmBMeQpEbqcgHwh8jX7wpMSZGIBvLiyNf/mbBXuSR1UpcLgGsjX7868JIUiWggB0S+/qYkWUhSQ1kAxInthDSYDYm/BZPi85ekxupyAfA48RMBX5kiEfXtlcQvxPS7FIlIUlN1uQAAuCTy9S8B1kiRiPoSO/KyGLg0RSKS1FRdLwB+Gfn6ycD+KRJRzyYCB0Ye4wZgZoJcJKmxul4A/CrBMf4mwTHUu/2ATSKP8dsEeUiSGu524tZ6no+7A9bpG8Svz31w7VlLaqJW7wUgOJX4D/m42rPupqnAXOI+q9m4foOk3lgAtNzLif+QL6s96246nPjP6pt1J62+bAF8Gvg9MIf4z9vIG3OGPstPAZvTPLHtV+EmElaFi/2gXRq4er8l/nN6U+1ZqxcTgI8Cz5C/0zKqiaeBDxP/CG+dYtusBkhxG+Ds2rPuln2J/4yeINxGUHnOIn8HZdQTZ9IcsW1VA7yU+A96AbBt3Yl3yAV068LTJSeSv1My6o0TaIbYdqohriX+w/5a7Vl3Q4oCbQnu3VCi6YRNmXJ3SEa9MRNYm/LFtlMNcTzxH/azwFZ1J94BPyf+s7mh9qzVi+PI3xkZeeIYyhfbxqJ1fSGgZf0n4RGzGCsRZrsqnVeQ5rn9MxIcQ+m5oVZ3HZQ7AWlZ/0aayjZ2qVoFqwC3Ev95PIaT/0p1Ffl/iRp54grKF9vGojkCsLzPESbzxfo3YNUEx+m6jwLbJzjOvxA/uqNqFH+RVGX87DOzAFjevcC3EhxnW+D/JjhOl20PfCjBcZ4CvpLgOKrGfbkTUDZ+9irODsBC4od+5gO715x7W0wGfkeaYcYv1py7+nMs+YeijTxxNOWLbaMa6D9J8wW/g2Y86lKaL5Hm/M8G1qs5d/VnbcIjYbk7I6PeeBxYi/LFtlMNtClh6DjFF/18YFK96TfaXwGLSXPuP1hz7hrMCeTvkIx641iaIbadaqhTSPdl/3jNuTfVDqTbAOYuwlMEaoYzyN8pGfXEaTRHbFvVUFNJs0nQEmAR8MZ602+cDYHbSHeReUu96SvSBOBkwoYxuTsoo5p4ijCx182A1AhvJd2Xfz7wmnrTb4x1CCv1pTrX59Osi4yW2oww+nY1YQ5H7k7LiItZhLUePjn02TZNbPvVcD8g3R/DfOB/15t+8dYk7WIwc4Gta22BpLayAOi4jUm7Wclc4C9qbUG51gQuIe0vjhNrbYGkNrMAEEeQtpN6hnB7ocu2Am4k7Xn9LS5uJSkdCwAB8E3SdlaLCUsPd7HD2ht4iLTncybuxCgpLQsAAWG4+nbSdlpLCEsPr1ZjO3I7DJhH+mLKCZaSUrMA0HN2oZrHlO4A9q2xHTmsCZxO+nO3BPh8je2Q1B0WAFrO0VTTiS0gPP60Un1Nqc2BhI0/qjhvv6Gd50xSfhYAep4vUE1ntgS4BtinvqZUagPCCm+plvZdMW4lrCEgSVWwANDzTCDcu6+qCFgCnEfYVriJViOs6lblQi6PAdvV1SBJnWQBoBGtClxGtUXAfOBUmrOC1irAMcD9VHtengZeWlObJHWXBYBGNR34PdV2dksI8wO+S7m3BjYGPg08QvXnYh7w6nqaJanjLAA0pnWAP1B9xzccVwLHETbPyWkV4HWEWyHzqaft84HX1tE4ScICQD1Yj/Sr2o0Xiwgr351EfWvfr0XY1fDbwBMVtGm8zv911TdRkp5jAaCerAtcTr2d4rLxAPB94L2ElfbWimzPFGBH4O2E/btvIBQdOdr2FHb+kurX6gLALVPTWo1wr76UVekeB+4civsIexA8Bcwh/KJeCZhKyHsqoYjZGtgG2JQylil+lND5X547qcyAjAAAGklJREFUEUmdE9uJ28d2zGTgLPKNBLQpbiMUI5KUQ6tHAFSd9wDPkr8TbWpcRBiRkKRcLAA0sH0J9+Zzd6ZNisWEtQ9c3ldSbhYAirIRYb363B1rE+Jxypk/IUkWAIo2EfgAYRJe7k621LgI2HKw0ytJlbAAUDI7AVeRv7MtKZ4i7BtQwhMHkrQsCwAlNRn4IPUvpFNi/AzYPO50SlJlLABUiY2A08m3uE7OuAc4DJ+RlVQ2CwBV6mXAJeTvlOuImcD7CKsMSlLpLABUi4OAS8nfSVcVjxA2TpKkprAAUK1eRTsXELo74TmSpDq0ugBw5nV5fg4syJ2EJKndLAAkSeogCwBJkjrIAkC9mpc7AUlSOpNzJ6BKHAlsSFhadwvCYjsbAKsBK4/ymmcJa/E/DtxHmLR3N/BH4EbCJj13VZeyJKlOFgDt9B3g6VH+2SRgDWAqYbLh/KH/nDvOMbdIlp0kKTsLgO5ZBMwaCklSR1kA5DcB2ArYFdh5KFbJmlE1NiCMTFwP3DAUd+dMSJK6zLXY67UGsB0wA9iTsDvg7qRfIW91Rr8FMKgtSN9hPwHcDtwMXAPcBFwHPJb4fSRpELGL+RTdxxadXINNInSYy3b0M4AXUM85b0oBMJoHCcXAcGFwDWEy4qKa3l+SwAJA41ib53f0uxNm3OfS9AJgJAsIowXDIwU3A1cBD2XMSVK7WQAICDvYzSDco99lmdggZ1KjeDfwL4mPmbsAGM2DhPkEf2Dp3IKbCY81SlIMC4AO2pilv+aHf9m/kNGfoS/NEuA9wJcTHrPUAmAkC4F7WX5uwc1DUfwGHZKKYQHQYlMIk/L2ZGlHvwuwfs6kEkldBDSpABjNHMKiRsvOL7iO8ddAkNRNrS4AumhP4DSWTirLvU1ulbEYeFea08YbCmhPFbGI8F34KrBHonMlqR1iry8qxKrA1widYu5Op2lFwKuAZwpoSx3n6kzauQ6DpP7FXlNUgFWA35K/g8nZsQ1aBHSl8182LqI58z0kVSf2WqICfIX8nUruGKQI6GLnPxwpJ1BKaqbY64gy24H23+vvNfopArrc+S8hPEmwfY/nSlI7xV5HijYxdwI1OJxutLMXEwi/bMcrAl4F/JBu3wufRPjuSJIaaGPgFvL/miwtxhoJ6Pov/2XjD8C0Uc6TpPaLvYYog4nAMYTnvnN3IqXGYsKKgcs6CDv/FeMB4DAkdVHs9UM12wu4mvwdR4pYDNwB/IiwWE0Vxx8eCfCX/9jxQ2BTJHVJ7HVDNVkZ+EfC5K3cncUgMZvwqOJXgHcCL2X54ef9qK4I+CrVdP6LCCMxLweOJyzAdClhG+Dc53uQeAI4kTA/QFL7xV4zitaWZQpnAN8iLONbuoWEXe2uH4obhv7znh5eux/wY8Juf6VbDPwt8I0R/tkEYCvC57Xs5krb0IzO9XLgLTR/aWRJY4vtxNvSxxbrMKr5ZZwiZgK/A04l/BLel/htgvcFniygbWPFIuAdA7RteMfFw4DPAecRdvvL3Z6RYg7wxgHaKKk5Yq8TqsgawH+TvyNYAswHfk/4tfsB4EBgw+qaXtntgFSd/+GJ27sxcDDwQeAcwgY+8wto62Lgi8BKidsrqQwWAAXajqVbu+aOW4C1q23uiPajvCKgis5/NNMJm/jkbvMS4BJgs2qbKykDC4DCHEgYWs990V82LgamVtnoUexHOUVAnZ3/NMKtldxtXjYeI3wektrDAqAg7wYWkP9ibxHw/M7/iIrbOazEzn845uG8AKlNLAAKcTL5L/DjxSXkWTku58TAxYTHFuuwOnBhDW2KPR/vr+oESKqVBUBmE4B/Iv+F3SLAzr+fOBUfAZKazgIgo0nA18l/Me836i4CViKMkMxL3I6xYjFwbB2No3md/3B8A58QkJos9hqgAU0GziX/RXzQuJh6ioAXExYSqrt9txOexqhayff8e4nv0IzFjSQ9X+zfvwYwETib6i/OlxGWqb24ouNXWQSsBnyJvEsfP00YeZhcURur7PwvBt4A/Kmi4y8b5+CW1FITxf7tawD/QrUX5EeBI1l6UZ5Ks4qAVxI2Caq64+o1fg/skbiNVXf+w09srAJ8nFDMVHmOzsQ5AVLTxP7dq0+fptoL8TcJi8isqAlFwFrAWYT771Weo0FiAfAPwKoJ2llX57+srYGLKnrP4fhU5HmRVK/Yv3n14Viqu/jOImzgMpaSi4C/IuxNX0dnHhO3A/tHtDNH5z9sIvAhqp1MedygJ0ZS7WL/3tWj/YFnqeai+xtg8x7zKK0I2BD4fkX5VBWLCUPea/XZ1pyd/7J2BW6sKA/DMLoR81BPtiLcl6/iQ/hn+p+kVkIRMIGwtG5pyx73Ew8QJtr1opTOf9hU4HsV5WMYRvvjITSuqVTzGNs8wn70g6ry2fPx1gnYEvhFRe+dI84DNs10rn83zrkeywTCUw45n7QwDKOZcSka17dJf+IfBvZKkFvdIwGTgPeQf23/KmIWcBTPnwlf2i//kbyGdn4mhmFUF19FYzqc9Cf9bmD7hDnWVQTMIKxLUOcX9Fnqf6LgQmDboTY3ofMf9lLg8YrPjWEY7Qk3BhvDdqRfu/4mxh5qHlSVRcDvgE8C8ys6/mhxBbAz8BfArTW/99PAR2hO5z9sBnB/RTkbhtGeeJJwa1MjmAJcRdoTfj2wToU5V1kE1BlPAe9j+eVpVwU+S7lbLfcTVW/LvCVwTwHtNAyj3DgNjSr1Yj+3AhvUkHfTi4BfEha8Gc1uwDUF5DloVN35D9sOeDBD+wzDKD/mEX4oaAQzSDvcfRewWY35N7EImEl4IqKXpWgnAx+k+qVxU0ddnf+wFwKPVdAOwzCaHZ9GI5pA2s7zUZZOKKtTk4qAc4GNBmjjtsCvC8i/l6i78x+2F+GWSu72G4ZRRlxMuMWtERxFuhM9nzCBLZcmFAHvi2zjBMJGObnbMd4fXI7Of9ibKHNvBsMw6o27gfXRiNYj7WNUR9Wb/ohKLwJemqCNLyugHaNF7s5/2MfIfy4Mw8gX9xBub2sUXybdyf5yzbmPpeQiIMV6CC8ooB0jRSmdP4SRku+S/5wYhlF/XIy//Me0Dekm/l0DrFxv+uMqtQhYN0Hb1i+gHSP9wZXS+Q9bA7iD/OfGMIx6Yh5hwp/3/MeRarnfJ0m7yl9KpRUBi1j+Wf9BrURZ97hL7PyHvZjqdrQ0DKOMeJLwnP+WaFx7kq4DeUfNuferpCJgVsJ2zSmgPUsou/Mf9iHynyfDMNLEPMLeMpcB/0ZY3tcV/vrwM9J8EOfVnfiASikC/pSwTXcW0J4mdP4AE0m3p0MTNhOJbaOkltqZNL/+5wJb1Zx7jCq3t+01rkjYnqsztyVmS98cXkiaWwELCJMwS2YBIGlE55CmAzip7sQTyF0E/CxhW87P2I6mdf7DPkOa9v9X3Yn3yQJA0vNsRppfQb8nzWS2HHLeDvhmwnakmsTZbzRl2H8kq5LmqYDFhBUHS2UBIDXUxAqP/R7CDPJYHyLMaG+iucCrgIsyvPfjCY81M+GxenUJcAjhHDbRM8D/S3CcCcAHEhxHkmqxKqHTiP11kHIYO6ep9Leu/lzit0v+ZML8PxWZy5VDber13/8Vzf3lv6wJpJk/8SywYc2598oRAKmhqhoB+Etg7chjLAZOTpBLCeYCBwGnEH4ZjuVywvK710W+Z8pf7bHHug7Yl1AIjOVpwt4DB9HcX/7LWkIYwYq1EmE3R0kq3gXE/zL4Tu1Z12N9QmHzc+B24CHC6oZnEDq+4S17zyXu/L0tYc6HReby/aHjTAAOHmrr1cCDwG3ATwnD3OslzLkkKXZVvJtqb9kNyhEASc/ZgnDPPvbCsEfdiRfmQuLO3yEJc3lNZC6/TphLEx1M/N/DEuCVdSfeAwsAqaGq+EVxeILjXkCY/d9l60S+vqRbALFtabrzib+lA+HWmiQV60bifxUcUHvW5bmfuHOYcs+EHSJzuS9hLk31FuL/Lu5h6S2iUjgCIAkIu/7FXhBupbyLXA7PEHcepyfMZb3IXJ5KmEtTTSbMeYj9+9it7sTHYQEgNVTqWwCvT3CMs/DCsCqwSsTrFxM28EllFnGfyWrEtacNFgL/meA4Kf7GJCm53xL3a2ABsFHtWZdnM+LOY8pFgIbNjsxpkwpyapodiN8b4ze1Zz02RwCkhko5ArAOsE/kMX5CGCbtutg1FKpYuS+2qEh5S6KpbiWs8xBjL2BKglwkdVzKAmA/4tfs/26CPNogdtZ8FSMAsUWFBUAQu7nPqsDuKRKR1G0pC4CXR75+Ae1Z+jdWSY8ADostKrr+KOCwHxI/9P2yFIlI6raSCoCLCPeZFX8LYFaSLJbnCEAa9wB/iDxG7K02SUpWAKwB7Bp5jP9OkUhLxHaW3gIo248iXx/7tyZJyQqAfYi////LFIm0RGxnWcUtAAuAdGK/61sT5gJI0sBSFQAvinz9I4RNYRS0cRKgcwCWuhqYF/H6icCOiXKR1FGpCoAZka//DT4TvKw2TgJ0BGCp+cAVkceI/ZuT1HGlFAAXJ8miPUpcB8BbAGnFfuctACRFSVEATCZ+45mrE+TRJt4CaL9rIl+/dZIsJHVWigJge2DliNcvAW5KkEebeAug/W6IfP0WSbKQ1FkpCoBtI19/L/BEgjzaxFsA7XcXcbskbp4qkQFsDLyTsHR3rJ8MHWvjBMeSVLPjiNsM5Mf1p1y01Yk7n4tIv8sjhMc8F0Xm5qNry7uSwc/lYurdYXEicABhKeOFEXmP9b29AHgT4baipIql6ChiK/fbE+TQJrG/lGcTOofUFhG/xbDzAJYX8+jrBGDTVImMYRJwBHAHSzvo2DU/RrJsgXEbcHhF7yNpSAkFwAMJcmiTEhcBSnVsbwMsL/a7X/UWy/8buBH4OrBlxe+1rK2AfweuBw6u8X2lTklRAMT+Crk/QQ5tEvsr+bEkWYzMJwHS+nPk69dNksXzrQWcDvyUvAsO7QT8nDAqUFVbpc5KUQCsH/l6RwCWV+JGQMN8EiCt2O9+FZ3ivoSnco6p4NiDehNhAyU3QZISSlEArBb5+ocT5NAmJT4CmOrYFgDLi/3upy4ATgR+TZkz8jcGLgROyJ2I1BYlFAAxj0K1kbcAuiP2u5+qAJgAfB74MrBSomNWYQrwr8DnCDlLipDicZvYR5GeSZBDm3gLoDuejnx9ioJqAnAaZQ35j+dkwhbkJ+AeItLAShgBiL0Itk2JywAP8xZAWrHF77QEOXyBZnX+w44D/j53ElKTpSgAYkcAYrZFbaPYTrLKEQALgLRii9/YAuAk4P2Rx8jpwzgnQBpYigIg9hhVLFrTZI4AdEfsd39qxGv/F/ClyPcvwT8TnlyQ1KcqloxVnNhOssoCIPbYTgJMa9ACYDpwDu1YaW8y8G1cJ0DqmwVAebwFoF4NWgCcTt7NhFLblPB0gKSaxW4CouXNI+58VtnJrhOZm098LG9d4s7nIOsIHBL5niXHQQOcD6mzUjxLG9uJ+zzvUqsDcyNev4jwrHRV8yomAc8SN3I0Fdd+GLYu8GjE6x+nv6HvlYFbCGvtV+EewmI91wN/Yukkx9UJ24bvAuxPdaMPfyIsH7ygouNLWoEjAOlsTty5rHIRoGGPR+a4WQ05NkXsCEC/t3tit+4eKRYBZwMv6SOPvQkbDM2vIJ+j+shDUiQLgHR2I+5cxmwv26vbI3PctYYcmyK2AHiyj/eaQviFnrKz/TGw8wDtHrYl8KPEOd1F2asZSsVwEmBZSt4KONV7OBEwnX5m8R9KuqH3BcDxwGuAGyKOczfwl8C7gIXxaQGhqPg/iY4ltZoFQFlKfgQw1Xv4KGA6/RQAqYbGHydMtvtqouMBfGXomKkK2KMTHUdqNQuAspS8E2Cq93AEIJ1e9/LYHnh5gvebD7weuCjBsVZ04dCx5yc41v7A1gmOI7WaBUBZSt4JcJgjAOWYSG9P0fxVj//eeI4GLklwnNH8jjT7EkwgtFnSGCwAyhK7E+DsJFmMzRGAsvRyG+CQBO9zBmH1wKqdDZyV4DivTnAMqdUsAMpS8j4AwywAyjLebYBpwD6R7zGTsPFOXU4mfkXLfQnrD0gahQVAWXwKQP0abwRgN3qfKzCaf6baJaZXNBM4NfIYKxHaLmkUFgBlaUIB4ByAsox3b3/PyOMvIAz/1+104h8N3CNFIlJbWQCUpQmPAToCUJZF4/zzF0Ye/1cMtudArIcITwbEiG271GoWAGXxMUD1a7wCYJPI418Q+foY50e+PrbtUqtZAJSlCSMA3gIoy3jD5JtGHv+ayNfnfG8LAGkMFgDlmEpYr31Qi4AnEuUyljmM/6tzLFMYfB97Pd94Oz/GPlp6e+Trc763xaY0BguAcqQY/q9qG+BlLSZ+vQFvA6TRSyEW+wRAHaNKo4ld2KqfpZKlzrEAKEcT7v+nei8LgDTqKABSrCCY670tAKQxWACUI3aots7ntJ0HUIZeRnxi19bPWazFfk+eTZKF1FIWAOVowj4AwxwBKEMvIwCPRr7HdpGvj7F95Otj2y61mgVAOWI7xbpXaothAZBGHQXAiyJfHyN2EaOc8xek4lkAlKMJqwCmei9vAaTRSwFwT+R7HBj5+hgHRb7+3iRZSC1lAVCOJmwENMwRgDL0slTuTZHv8Upgw8hjDGIDYL/IY1yfIA+ptSwAyhE7CbDOEYDYYsMCII1eRgBuiHyPycC7Io8xiJOIf4LhxhSJSG1lAVCOdSNf7whA9/RSAFxN/KY67wM2jzxGPzYlFAAxFhLaLmkUFgDl8DFA9auXAmA2cFXk+6wKfCryGP34LLBa5DEup56VMaXGsgAoR5cmAToCkEavv+xjN9UBOAw4PMFxxnME8LYEx0nRZknjWBIZCh4m7jxuVWOu20Tm+mCNuZZsXeLO4209vs9Oke8zHM8SPzFvLPsC8xLlumOFeUoaYgGQxnzizuNaNea6VmSusavTtUVsAXBLH+91VeR7DcfjwCsGa+6YXjl07BQ5XlZBfpJGYAEQbxpx53AB9a7ZPpEw/ByT87Qa8y1VbAHQzwz/4yPfa8Xv24kDtXhkJw0dM1V+RyfMTdIYLADibUHcOXyk/pR5NCLfJYQ2d11sAXBdH++1GvG3mVaMnwO7DdDuYbsDv0ic04PAKhE5SZ3hJMAyNGknwFTv6UTAeL08BTDsaeCfEr//wcA1wDeBl/b4mgnAPsC3CI/pxa72t6J/JMwjkDSO2IU2lEaTngAY5qOAzfMV4N3ARgmPORF461DcB1xIWIHvDuDJoX9nDWBrYFdgf8Jz/lW4H/hqRceWWscCoAxNWgZ4mCMA+fW73/2TwIeAcyrIBWAzwuOCubwfmJvx/aVG8RZAGZq0DHCq97QAiDdIAf9N4KLEeZTgAuC/cichNYkFQBmatAxwqvf0FkC8fkcAIEyUezt5isaqzAKOyp2E1DQWAGVo0jLAwxwByG/QW3j3A8ekTCSjJYTVA936V+qTBUAZnAOgQQwyAjDsXOAzqRLJ6JPAf+dOQmoiC4AyxHaGFgDdFDuJ9++As1Mkksm3gVNyJyE1lQVAGWI7wxy3AJwDkF9sATC8at65CXKp2/eAd+BiYtLALADK4C0ADSLmFsCwZ4FDgW8kOFZdvk1Yd2BB7kSkrovdxMY14cNSvjHncMvaMw4Lu8Tk/FD9KRcn9hzenzCXCcDJhNUFUy7NmzIWA5/DHy5SMR4j7o96p/pTLsoEwq+wmHO4Zu1Zh/eMyflZ6t3AqET7E3cOb64gpzcCT0TmVUXMAf6qgvZKnZWiko69/5x6LfCmmQasFPH6hYQLdt2eGHrvQa2Eoz8HRr6+irkf3wd2AX5dwbEHdQGwM/DD3IlIWt7PiKvsbyTNvcym2pK485djJ8BhTbx1UYrVCEP4MefvPyrMbwJhguCDkTnGxAPAkThSJFUixQjAHyNfP4OwV3lXNXECYKr37vKTAB8FNok8xq0pEhnFEuBMYDvgE8DsCt9rRbOAjw2999eGcpFUoEOJr/TnAwfUnXghDiTu3F1Sf8rPuWSMvHqJ2CHwpjqUNJPt9qsx56nACYSCv6pf/LcQfgysXlObJEVanzA7N0UR8G66dzsgtoA6r/6Un3PeGHn1EofWn3JWUwi/bFN0/k8DK9eb/nP2AD4L3ETc3/5iwi3Avwd2r7UFkpJsB/wIcCXwksjjTAFOBd5JGPY7H7iHpXuKt1Xs8/A5N3VxLYDxrQlsBbyKsP7+VomOewGhaM7h90PxEcJGVi8D9gS2BbYh/ChYkzBqAGGL3jmEa8WfhuIa4FLCU0SSMkg1ueYE4F8THUvS+N5EmLEvSQNJVQBMJ/xanzrevygp2sOEJyjmZc5DUoOlWlFrJnBGomNJGtuXsPOXFCnl87UbAbfhKIBUpYcIj8fNzZ2IpGZLOeN+LmFzjq6v7CdV6VjCBDpJipJ6ha3JwOWEGcGS0roAOJjwCJ0kRaliic1tCL9QcmxQI7XVw4Rn5R/MnYikdqhiW807gLcTt1GMpKXmEXbps/OXlExVq+7dRtjI47W4kYcUYxFhxcTzcyciqV2qXHb3WuAuQhFQxUiD1Hbzgb8BfpA7EUntU/W6+38ArgMOAVap+L2kNnkEeB1hu21JSq6u4fltgO/i0wFSLy4i/PJ/IHMeklqsrqH5O4C9gfcAT9T0nlLTzCL8jbwSO39JFatz693FwBXAfwz9710IOwBKXTcL+DzwVsKvf5/zl1S5nDP01wbeAryNMDrg0wLqkkXAb4FzCLv6tX3ba0mFKaXTXQ/Yj1AI7EiYM7AOMA1YOV9aUrR5hM79MeB24FbgEuA3wOyMeUmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJKlB/j8EZD+XjaUPUwAAAABJRU5ErkJggg=="/>
            </defs>
        </svg>
    )
}