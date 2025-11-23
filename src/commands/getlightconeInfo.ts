import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import getlightconeInfo_core from '../core/getlightconeInfo_core';

export const data = new SlashCommandBuilder()
    .setName('getlightconeimage')
    .setDescription('광추 이름으로 광추 이미지 검색')

    .addStringOption((Option) => Option.setName("lightconename")
        .setDescription("광추 이름을 적어주세요: ")
        .setRequired(true))
    .addIntegerOption((Option) => Option.setName("starts")
        .setDescription("중첩 (입력 없을시 0중첩)")
        .setRequired(false))
    .addIntegerOption((Option) => Option.setName("level")
        .setDescription("레벨 (입력 없을시 1레벨)")
        .setRequired(false))



export async function execute(interaction: ChatInputCommandInteraction) {
    getlightconeInfo_core(interaction);
}